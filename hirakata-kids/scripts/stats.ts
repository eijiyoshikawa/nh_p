/**
 * Report seed-pool statistics.
 *
 * Usage:
 *   npm run stats
 *
 * Output includes per-category seed counts, total Candidate count after
 * expansion, and which AreaSlug / ThemeTag / AgeTag the seeds reference.
 */
import { allSeeds } from "./lib/seeds";
import { expandSeeds } from "./lib/expand-seeds";
import { categories } from "../src/lib/categories";
import { areaSlugs } from "../src/lib/areas";

function countBy<T>(items: T[], key: (x: T) => string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const it of items) {
    const k = key(it);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

function fmtRow(label: string, n: number, total: number): string {
  const pct = total > 0 ? ` (${Math.round((n / total) * 100)}%)` : "";
  return `  ${label.padEnd(24)} ${String(n).padStart(4)}${pct}`;
}

function main() {
  const seeds = allSeeds;
  const candidates = expandSeeds(seeds);

  console.log(`Seed pool stats`);
  console.log(`  seeds:      ${seeds.length}`);
  console.log(`  candidates: ${candidates.length} (after expansion)`);

  console.log(`\nSeeds by category`);
  const seedByCat = countBy(seeds, (s) => s.category);
  for (const c of categories) {
    console.log(fmtRow(c.label, seedByCat[c.slug] ?? 0, seeds.length));
  }

  console.log(`\nCandidates by category`);
  const candByCat = countBy(candidates, (c) => c.category);
  for (const c of categories) {
    console.log(fmtRow(c.label, candByCat[c.slug] ?? 0, candidates.length));
  }

  console.log(`\nSeeds by kind`);
  const byKind = countBy(seeds, (s) => s.kind);
  for (const k of ["universal", "per-area", "monthly"]) {
    console.log(fmtRow(k, byKind[k] ?? 0, seeds.length));
  }

  console.log(`\nPer-area candidates`);
  const perAreaSeeds = seeds.filter((s) => s.kind === "per-area");
  console.log(`  per-area seeds: ${perAreaSeeds.length}`);
  console.log(`  area slugs:     ${areaSlugs.length}`);
  console.log(`  expansion:      ${perAreaSeeds.length} × ${areaSlugs.length} = ${perAreaSeeds.length * areaSlugs.length}`);

  const angles = countBy(
    seeds,
    (s) => s.angle ?? "unspecified"
  );
  console.log(`\nAngles`);
  for (const k of Object.keys(angles).sort()) {
    console.log(fmtRow(k, angles[k], seeds.length));
  }
}

main();
