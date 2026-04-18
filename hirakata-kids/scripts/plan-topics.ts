/**
 * Generate scripts/plan.json: a schedule of article drafts to produce,
 * one per calendar day from --from to --to.
 *
 * Usage:
 *   npm run plan -- --from=2025-02-01 --to=2026-04-18
 *   npm run plan -- --from=2025-02-01 --to=2026-04-18 --seed=7
 *   npm run plan -- --from=2025-02-01 --dry-run
 *
 * Output:
 *   scripts/plan.json (an object { createdAt, from, to, entries })
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { allSeeds } from "./lib/seeds";
import { expandSeeds } from "./lib/expand-seeds";
import { dateRange, planDates, type MonthHint } from "./lib/date-planner";
import type { Plan } from "./lib/topic-types";

type Args = {
  from: string;
  to: string;
  seed: number;
  dryRun: boolean;
  out: string;
};

function parseArgs(argv: string[]): Args {
  const get = (name: string): string | undefined => {
    const found = argv.find((a) => a.startsWith(`--${name}=`));
    return found ? found.slice(name.length + 3) : undefined;
  };
  const has = (name: string): boolean =>
    argv.some((a) => a === `--${name}` || a.startsWith(`--${name}=`));

  const today = new Date().toISOString().slice(0, 10);
  return {
    from: get("from") ?? "2025-02-01",
    to: get("to") ?? today,
    seed: Number(get("seed") ?? 42),
    dryRun: has("dry-run"),
    out: get("out") ?? path.join("scripts", "plan.json"),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(
    `[plan] range: ${args.from} → ${args.to}, seed=${args.seed}, dryRun=${args.dryRun}`
  );

  const dates = dateRange(args.from, args.to);
  const candidates = expandSeeds(allSeeds);
  const hints: MonthHint[] = allSeeds
    .filter((s) => s.months && s.months.length > 0)
    .map((s) => ({ seedId: s.id, months: s.months! }));

  console.log(
    `[plan] seeds=${allSeeds.length}, candidates=${candidates.length}, dates=${dates.length}`
  );

  const entries = planDates(candidates, dates, {
    seed: args.seed,
    hints,
  });

  const uniqSlugs = new Set(entries.map((e) => e.slug));
  console.log(
    `[plan] produced ${entries.length} entries (${uniqSlugs.size} unique slugs)`
  );
  if (uniqSlugs.size !== entries.length) {
    console.warn(
      `[plan] WARNING: ${entries.length - uniqSlugs.size} duplicate slug(s) — this should never happen. Investigate date-planner.ts.`
    );
  }

  const plan: Plan = {
    createdAt: new Date().toISOString(),
    from: args.from,
    to: args.to,
    entries,
  };

  if (args.dryRun) {
    console.log(
      `[plan] dry-run — first 10 entries:\n` +
        entries
          .slice(0, 10)
          .map(
            (e) =>
              `  ${e.publishedAt}  ${e.slug.padEnd(42)}  ${e.category}/${e.subcategory ?? "-"}`
          )
          .join("\n")
    );
    return;
  }

  const outPath = path.resolve(process.cwd(), args.out);
  await writeFile(outPath, JSON.stringify(plan, null, 2) + "\n", "utf8");
  console.log(`[plan] wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
