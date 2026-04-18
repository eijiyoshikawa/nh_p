import { GoogleGenAI } from "@google/genai";
import type { PlanEntry } from "./topic-types";
import { SYSTEM_PROMPT } from "./prompts";
import { fetchSourceText } from "./fetch-source";
import { findSourceByUrl } from "./sources";

// Free-tier friendly Gemini adapter. Mirrors the shape of claude-body.ts
// so scripts/generate-batch.ts can swap providers with a flag.
//
// Free-tier limits (as of 2026) for gemini-2.5-flash:
//   - 10 requests / minute (RPM)
//   - 250,000 tokens / minute (TPM)
//   - 1,500 requests / day
// The batch runner enforces the RPM limit via its --delay flag (default
// 6500ms in gemini mode).

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
        `[参考${i + 1}] ${s.title}\nURL: ${s.url}\n内容抜粋（最大4000字）:\n${s.text.slice(0, 4000)}\n`
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

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

export async function generateBodyWithGemini(
  entry: PlanEntry
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY (or GOOGLE_API_KEY) env var is not set. Get a free key at https://aistudio.google.com/apikey"
    );
  }

  const sources = await collectSources(entry.sources);
  const userPrompt = buildUserPrompt(entry, sources);

  const client = new GoogleGenAI({ apiKey });
  const response = await client.models.generateContent({
    model: MODEL,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.6,
      maxOutputTokens: 8192,
    },
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }],
      },
    ],
  });

  const text = (response.text ?? "").trim();
  if (!text) {
    throw new Error(
      `Gemini returned no text (finishReason=${response.candidates?.[0]?.finishReason ?? "unknown"})`
    );
  }
  return text;
}
