import type { PlanEntry } from "./topic-types";
import { findSourceByUrl } from "./sources";

// Build YAML frontmatter from a PlanEntry. The date is taken from the
// plan (so multiple runs produce consistent publishedAt values) and a
// `draft: true` marker keeps generated content out of production until a
// human removes it.
export function buildFrontmatter(entry: PlanEntry): string {
  const lines: string[] = ["---"];
  lines.push(`title: ${JSON.stringify(entry.title)}`);
  lines.push(`description: ${JSON.stringify(entry.description)}`);
  lines.push(`category: ${entry.category}`);
  if (entry.subcategory) lines.push(`subcategory: ${entry.subcategory}`);
  if (entry.areaTags.length) {
    lines.push("areaTags:");
    entry.areaTags.forEach((a) => lines.push(`  - ${a}`));
  }
  if (entry.ageTags.length) {
    lines.push("ageTags:");
    entry.ageTags.forEach((a) => lines.push(`  - ${a}`));
  }
  if (entry.themeTags.length) {
    lines.push("themeTags:");
    entry.themeTags.forEach((t) => lines.push(`  - ${t}`));
  }
  lines.push(`author: "HIRAKIDS編集部"`);
  lines.push(`publishedAt: "${entry.publishedAt}"`);
  lines.push(`updatedAt: "${entry.publishedAt}"`);
  lines.push(`draft: true  # Review before publish`);
  if (entry.sources.length) {
    lines.push("sources:");
    for (const url of entry.sources) {
      const entryLookup = findSourceByUrl(url);
      const title = entryLookup?.title ?? url;
      lines.push(`  - title: ${JSON.stringify(title)}`);
      lines.push(`    url: ${JSON.stringify(url)}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}
