export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

// Slugifier aligned with rehype-slug / github-slugger defaults:
// - trim, lowercase (except CJK), strip most punctuation, spaces→hyphens,
//   collapse runs of hyphens.
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s\u3000]+/g, "-")
    .replace(/[`~!@#$%^&*()=+{}\[\]\\|;:'",.<>/?！？。、「」『』（）［］｛｝]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Parse MDX body and extract H2/H3 headings. Skips fenced code blocks.
export function extractToc(body: string): TocItem[] {
  const lines = body.split("\n");
  const items: TocItem[] = [];
  let inFence = false;
  for (const raw of lines) {
    const line = raw.replace(/\r$/, "");
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length === 2 ? 2 : 3;
    const text = m[2].replace(/[*_`]/g, "");
    items.push({ id: slugify(text), text, level });
  }
  return items;
}

// Japanese 400 chars/min baseline. Strip fenced code + markdown syntax.
export function estimateReadingMinutes(body: string): number {
  const cleaned = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[#>*_|\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const chars = Array.from(cleaned).length;
  return Math.max(1, Math.ceil(chars / 400));
}
