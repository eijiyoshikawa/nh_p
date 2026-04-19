import type { PlanEntry } from "./topic-types";
import { SYSTEM_PROMPT } from "./prompts";
import { fetchSourceText } from "./fetch-source";
import { findSourceByUrl } from "./sources";

// Free-tier friendly Groq adapter. Uses the OpenAI-compatible chat
// completions endpoint so no extra dependency is needed — just fetch.
//
// Free-tier limits (as of 2026) for llama-3.3-70b-versatile:
//   - 30 requests / minute
//   - ~14,400 requests / day
//   - 6,000 tokens / minute
// The batch runner enforces inter-request spacing via --delay (default
// 2500ms in groq mode → 24 RPM safely under the 30 RPM cap).

type SourceFetch = { url: string; title: string; text: string };

async function collectSources(urls: string[]): Promise<SourceFetch[]> {
  const fetched = await Promise.all(
    urls.map(async (url) => {
      const entry = findSourceByUrl(url);
      try {
        const text = await fetchSourceText(url);
        return { url, title: entry?.title ?? url, text };
      } catch {
        return { url, title: entry?.title ?? url, text: "" };
      }
    })
  );
  return fetched.filter((s) => s.text.length > 0);
}

function buildUserPrompt(entry: PlanEntry, sources: SourceFetch[]): string {
  const sourcesBlock = sources
    .map(
      (s, i) =>
        `[参考${i + 1}] ${s.title}\nURL: ${s.url}\n内容抜粋（最大1800字）:\n${s.text.slice(0, 1800)}\n`
    )
    .join("\n---\n");

  const areaLine = entry.areaTags.length
    ? `- エリアタグ: ${entry.areaTags.join(", ")}`
    : "";
  const ageLine = entry.ageTags.length
    ? `- 年齢タグ: ${entry.ageTags.join(", ")}`
    : "";
  const themeLine = entry.themeTags.length
    ? `- テーマタグ: ${entry.themeTags.join(", ")}`
    : "";
  const angleHint = entry.angle
    ? `- 記事アングル: ${entry.angle}（list=比較リスト / guide=手順 / faq=Q&A中心 / column=解説コラム）`
    : "";

  return `以下の条件でMDX本文を執筆してください。

【記事情報】
- タイトル: ${entry.title}
- 要約: ${entry.description}
- カテゴリ: ${entry.category}${entry.subcategory ? ` / サブ: ${entry.subcategory}` : ""}
- 公開日（想定）: ${entry.publishedAt}
${[areaLine, ageLine, themeLine, angleHint].filter(Boolean).join("\n")}

【参照資料】
${sourcesBlock || "（なし — 一般論にとどめ、具体的な数値や住所は書かないこと）"}

【指示】
1. 上記の資料だけを根拠に、親世代が読んで役立つ記事を書く。
2. 資料にない数値・固有名詞は推測で書かない。
3. 末尾に「## よくある質問」セクションを付け、3件のQ&Aを含める（"### Q."の書式）。

出力はMDXの本文のみ。frontmatter（---）は含めない。`;
}

const MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
const ENDPOINT =
  process.env.GROQ_ENDPOINT ??
  "https://api.groq.com/openai/v1/chat/completions";

type GroqResponse = {
  choices?: Array<{
    message?: { content?: string };
    finish_reason?: string;
  }>;
  error?: { message?: string };
};

function parseRetryAfterSeconds(bodyText: string): number | null {
  // Groq returns "Please try again in 12.87s" or "Please try again in
  // 1h12m26.78s" inside the error message. Extract and return seconds.
  const hms = /try again in\s+(?:(\d+)h)?(?:(\d+)m)?([\d.]+)s/.exec(bodyText);
  if (!hms) return null;
  const [, h, m, s] = hms;
  return Number(h ?? 0) * 3600 + Number(m ?? 0) * 60 + Number(s ?? 0);
}

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function generateBodyWithGroq(entry: PlanEntry): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY env var is not set. Get a free key at https://console.groq.com/keys"
    );
  }
  const sources = await collectSources(entry.sources);
  const userPrompt = buildUserPrompt(entry, sources);

  const MAX_RETRIES = 4;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const resp = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 4096,
      }),
    });

    if (resp.ok) {
      const data = (await resp.json()) as GroqResponse;
      const text = data.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) {
        throw new Error(
          `Groq returned no text (finish_reason=${data.choices?.[0]?.finish_reason ?? "unknown"}, error=${data.error?.message ?? "none"})`
        );
      }
      return text;
    }

    const bodyText = await resp.text().catch(() => "");

    // 429 with a "try again in X" hint: retry after backoff.
    // 503 transient server errors: retry with a short backoff.
    const retryable = resp.status === 429 || resp.status === 503;
    if (retryable && attempt < MAX_RETRIES) {
      const hintSec = parseRetryAfterSeconds(bodyText);
      // Cap the wait at 120s so TPD-hit doesn't block the whole run.
      // TPM retries usually want sub-60s; anything higher likely means
      // the daily cap — better to fail fast and let operator restart.
      const waitSec =
        hintSec !== null
          ? Math.min(Math.max(hintSec + 1, 2), 120)
          : Math.min(2 ** attempt * 2, 30);
      if (hintSec !== null && hintSec > 120) {
        throw new Error(
          `Groq HTTP ${resp.status}: retry-after ${hintSec}s exceeds 120s cap — likely daily quota exhausted. Re-run later.`
        );
      }
      console.warn(
        `[groq] ${resp.status} on ${entry.slug} — retry in ${waitSec}s (attempt ${attempt + 1}/${MAX_RETRIES})`
      );
      await sleep(waitSec * 1000);
      continue;
    }

    throw new Error(`Groq HTTP ${resp.status}: ${bodyText.slice(0, 500)}`);
  }
  throw new Error(
    `Groq: exhausted ${MAX_RETRIES} retries for ${entry.slug}`
  );
}
