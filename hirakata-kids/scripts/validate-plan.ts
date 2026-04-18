/**
 * Validate scripts/plan.json:
 *   - every slug is unique
 *   - every slug is kebab-case (a-z0-9-)
 *   - every publishedAt parses as ISO date
 *   - publishedAt values strictly increase
 *   - category / subcategory reference valid masters
 *
 * Usage:
 *   npm run plan
 *   npm run validate
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Plan } from "./lib/topic-types";
import { isCategorySlug, getCategory } from "../src/lib/categories";

async function main() {
  const planPath = path.resolve(process.cwd(), "scripts/plan.json");
  const plan = JSON.parse(await readFile(planPath, "utf8")) as Plan;

  const issues: string[] = [];
  const slugs = new Set<string>();
  let prevDate = "";
  const slugRe = /^[a-z0-9][a-z0-9-]*$/;

  for (const [i, e] of plan.entries.entries()) {
    if (slugs.has(e.slug)) issues.push(`[${i}] duplicate slug: ${e.slug}`);
    slugs.add(e.slug);

    if (!slugRe.test(e.slug)) issues.push(`[${i}] invalid slug: ${e.slug}`);

    const d = new Date(`${e.publishedAt}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) {
      issues.push(`[${i}] invalid publishedAt: ${e.publishedAt}`);
    }
    if (prevDate && e.publishedAt < prevDate) {
      issues.push(
        `[${i}] out-of-order date: ${e.publishedAt} follows ${prevDate}`
      );
    }
    prevDate = e.publishedAt;

    if (!isCategorySlug(e.category)) {
      issues.push(`[${i}] unknown category: ${e.category} (slug=${e.slug})`);
    } else if (e.subcategory) {
      const cat = getCategory(e.category);
      const ok = cat?.subcategories.some((s) => s.slug === e.subcategory);
      if (!ok) {
        issues.push(
          `[${i}] unknown subcategory: ${e.category}/${e.subcategory} (slug=${e.slug})`
        );
      }
    }
  }

  console.log(`[validate] entries=${plan.entries.length}, uniqueSlugs=${slugs.size}`);
  if (issues.length === 0) {
    console.log(`[validate] OK — no issues`);
    return;
  }
  console.error(`[validate] ${issues.length} issue(s):`);
  for (const m of issues.slice(0, 20)) console.error(`  ${m}`);
  if (issues.length > 20) {
    console.error(`  ... (${issues.length - 20} more)`);
  }
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
