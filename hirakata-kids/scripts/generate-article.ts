/**
 * Article generation pipeline for hirakata-kids.
 *
 * Usage:
 *   npm run generate -- \
 *     --slug=yamadaike-parking-tips \
 *     --category=outings \
 *     --sub=parks \
 *     --title="山田池公園の駐車場を徹底解説" \
 *     --description="..." \
 *     --area=yamadaike \
 *     --age=age-infant,age-lower-elem \
 *     --theme=free,stroller-ok \
 *     --source=https://www.city.hirakata.osaka.jp/... \
 *     --source=https://www.osaka-park.or.jp/...
 *
 * All generated articles are written with `draft: true` and require human
 * review before publish.
 */
import Anthropic from "@anthropic-ai/sdk";
import { writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fetchSourceText } from "./lib/fetch-source";
import { findSourceByUrl } from "./lib/sources";
import { SYSTEM_PROMPT } from "./lib/prompts";

type Args = {
  slug: string;
  category: string;
  sub?: string;
  title: string;
  description: string;
  area: string[];
  age: string[];
  theme: string[];
  sources: string[];
  author: string;
};

function parseArgs(argv: string[]): Args {
  const get = (name: string): string | undefined => {
    const found = argv.find((a) => a.startsWith(`--${name}=`));
    return found ? found.slice(name.length + 3) : undefined;
  };
  const getAll = (name: string): string[] =>
    argv
      .filter((a) => a.startsWith(`--${name}=`))
      .map((a) => a.slice(name.length + 3));
  const splitCsv = (v: string | undefined): string[] =>
    v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const slug = get("slug");
  const category = get("category");
  const title = get("title");
  const description = get("description");
  if (!slug || !category || !title || !description) {
    throw new Error(
      "Required args: --slug, --category, --title, --description"
    );
  }

  return {
    slug,
    category,
    sub: get("sub"),
    title,
    description,
    area: splitCsv(get("area")),
    age: splitCsv(get("age")),
    theme: splitCsv(get("theme")),
    sources: getAll("source"),
    author: get("author") ?? "HIRAKIDS編集部",
  };
}

async function collectSources(urls: string[]) {
  if (urls.length === 0) {
    console.warn(
      "[generate] WARNING: no --source URLs provided. Article quality will suffer."
    );
  }
  const fetched = await Promise.all(
    urls.map(async (url) => {
      const entry = findSourceByUrl(url);
      if (!entry) {
        console.warn(
          `[generate] WARNING: ${url} is not in the curated sources registry.`
        );
      }
      try {
        const text = await fetchSourceText(url);
        return { url, title: entry?.title ?? url, text };
      } catch (err) {
        console.error(`[generate] Failed to fetch ${url}:`, err);
        return { url, title: entry?.title ?? url, text: "" };
      }
    })
  );
  return fetched.filter((s) => s.text.length > 0);
}

function buildUserPrompt(args: Args, sources: { url: string; title: string; text: string }[]): string {
  const sourcesBlock = sources
    .map(
      (s, i) =>
        `[参考${i + 1}] ${s.title}\nURL: ${s.url}\n内容抜粋（最大4000字）:\n${s.text.slice(0, 4000)}\n`
    )
    .join("\n---\n");

  return `以下の条件でMDX本文を執筆してください。

【記事情報】
- タイトル: ${args.title}
- 要約: ${args.description}
- カテゴリ: ${args.category}${args.sub ? ` / サブ: ${args.sub}` : ""}
- エリアタグ: ${args.area.join(", ") || "なし"}
- 年齢タグ: ${args.age.join(", ") || "なし"}
- テーマタグ: ${args.theme.join(", ") || "なし"}

【参照資料】
${sourcesBlock || "（なし — 一般論にとどめ、具体的な数値や住所は書かないこと）"}

【指示】
1. 上記の資料だけを根拠に、親世代が読んで役立つ記事を書く。
2. 資料にない数値・固有名詞は推測で書かない。
3. 末尾に「### よくある質問」を付け、3件のQ&A を含める（この見出しの下だけFAQ扱い。本文には含めない）。

出力はMDXの本文のみ。frontmatterは含めない。`;
}

async function generateBody(userPrompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY env var is not set");
  }
  const client = new Anthropic({ apiKey });

  console.log("[generate] Calling Claude (claude-opus-4-7, streaming)...");
  const stream = client.messages.stream({
    model: "claude-opus-4-7",
    max_tokens: 64000,
    thinking: { type: "adaptive" },
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        // Prompt cache the stable system prompt (same across every run).
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: userPrompt }],
  });

  stream.on("text", (delta) => {
    process.stdout.write(delta);
  });

  const message = await stream.finalMessage();
  process.stdout.write("\n");

  const textBlock = message.content.find(
    (b): b is Anthropic.TextBlock => b.type === "text"
  );
  if (!textBlock) {
    throw new Error("Claude returned no text block");
  }

  if (message.usage) {
    console.log(
      `[generate] tokens: input=${message.usage.input_tokens}, output=${message.usage.output_tokens}, cache_read=${message.usage.cache_read_input_tokens ?? 0}, cache_write=${message.usage.cache_creation_input_tokens ?? 0}`
    );
  }

  return textBlock.text;
}

function buildFrontmatter(args: Args, sources: { url: string; title: string }[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const lines: string[] = ["---"];
  lines.push(`title: ${JSON.stringify(args.title)}`);
  lines.push(`description: ${JSON.stringify(args.description)}`);
  lines.push(`category: ${args.category}`);
  if (args.sub) lines.push(`subcategory: ${args.sub}`);
  if (args.area.length) {
    lines.push("areaTags:");
    args.area.forEach((a) => lines.push(`  - ${a}`));
  }
  if (args.age.length) {
    lines.push("ageTags:");
    args.age.forEach((a) => lines.push(`  - ${a}`));
  }
  if (args.theme.length) {
    lines.push("themeTags:");
    args.theme.forEach((t) => lines.push(`  - ${t}`));
  }
  lines.push(`author: ${JSON.stringify(args.author)}`);
  lines.push(`publishedAt: "${today}"`);
  lines.push(`updatedAt: "${today}"`);
  lines.push("draft: true  # Human review required before publishing");
  if (sources.length) {
    lines.push("sources:");
    sources.forEach((s) => {
      lines.push(`  - title: ${JSON.stringify(s.title)}`);
      lines.push(`    url: ${JSON.stringify(s.url)}`);
    });
  }
  lines.push("---");
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outPath = path.join(
    process.cwd(),
    "content",
    "articles",
    `${args.slug}.mdx`
  );

  try {
    await access(outPath);
    throw new Error(
      `File already exists: ${outPath}. Delete it or choose a different --slug.`
    );
  } catch (e) {
    if (
      (e as NodeJS.ErrnoException).code !== "ENOENT" &&
      !(e instanceof Error && e.message.includes("File already exists"))
    ) {
      throw e;
    }
    if (e instanceof Error && e.message.includes("File already exists")) {
      throw e;
    }
  }

  console.log(`[generate] Target: ${outPath}`);
  console.log(`[generate] Fetching ${args.sources.length} source(s)...`);
  const sources = await collectSources(args.sources);
  console.log(`[generate] Usable sources: ${sources.length}`);

  const userPrompt = buildUserPrompt(args, sources);
  const body = await generateBody(userPrompt);
  const frontmatter = buildFrontmatter(args, sources);
  const full = `${frontmatter}\n\n${body.trim()}\n`;

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, full, "utf8");

  console.log(`\n[generate] Draft written to ${outPath}`);
  console.log(
    "[generate] Review the content, verify sources, then flip `draft: true` to `false` (or remove it)."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
