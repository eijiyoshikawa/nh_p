/**
 * Batch-generate article MDX drafts from scripts/plan.json.
 *
 * Usage:
 *   # Template mode (no API calls — scaffolded drafts with TODO markers)
 *   npm run batch -- --template
 *
 *   # Claude mode (requires ANTHROPIC_API_KEY)
 *   npm run batch
 *
 *   # Flags
 *   npm run batch -- --limit=20            # process first 20 unresolved entries
 *   npm run batch -- --from-date=2025-04-01
 *   npm run batch -- --to-date=2025-12-31
 *   npm run batch -- --plan=scripts/plan.json
 *   npm run batch -- --dry-run             # print what would be written, write nothing
 *
 * Behaviour:
 *   - Entries whose target MDX already exists are skipped (resume-safe).
 *   - Template mode never talks to the network.
 *   - Claude mode respects a simple inter-request delay to be polite.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import type { Plan, PlanEntry } from "./lib/topic-types";
import { buildFrontmatter } from "./lib/frontmatter";
import { buildTemplateBody } from "./lib/body-template";

type Args = {
  plan: string;
  template: boolean;
  dryRun: boolean;
  limit: number;
  fromDate?: string;
  toDate?: string;
  delayMs: number;
};

function parseArgs(argv: string[]): Args {
  const get = (name: string): string | undefined => {
    const found = argv.find((a) => a.startsWith(`--${name}=`));
    return found ? found.slice(name.length + 3) : undefined;
  };
  const has = (name: string): boolean =>
    argv.some((a) => a === `--${name}` || a.startsWith(`--${name}=`));

  return {
    plan: get("plan") ?? path.join("scripts", "plan.json"),
    template: has("template"),
    dryRun: has("dry-run"),
    limit: Number(get("limit") ?? 0) || 0,
    fromDate: get("from-date"),
    toDate: get("to-date"),
    delayMs: Number(get("delay") ?? 500),
  };
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function filterEntries(entries: PlanEntry[], args: Args): PlanEntry[] {
  let filtered = entries;
  if (args.fromDate) {
    filtered = filtered.filter((e) => e.publishedAt >= args.fromDate!);
  }
  if (args.toDate) {
    filtered = filtered.filter((e) => e.publishedAt <= args.toDate!);
  }
  return filtered;
}

async function writeOne(
  entry: PlanEntry,
  body: string,
  outRoot: string,
  dryRun: boolean
): Promise<string> {
  const outPath = path.join(outRoot, `${entry.slug}.mdx`);
  const frontmatter = buildFrontmatter(entry);
  const full = `${frontmatter}\n\n${body.trim()}\n`;
  if (dryRun) return outPath;
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, full, "utf8");
  return outPath;
}

async function sleep(ms: number): Promise<void> {
  if (ms <= 0) return;
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const planPath = path.resolve(process.cwd(), args.plan);
  const outRoot = path.resolve(process.cwd(), "content", "articles");

  if (!(await fileExists(planPath))) {
    console.error(
      `[batch] Plan not found: ${planPath}. Run \`npm run plan\` first.`
    );
    process.exit(1);
  }

  const plan = JSON.parse(await readFile(planPath, "utf8")) as Plan;
  const entries = filterEntries(plan.entries, args);
  console.log(
    `[batch] plan=${planPath}, total=${plan.entries.length}, in-range=${entries.length}, mode=${args.template ? "template" : "claude"}, dryRun=${args.dryRun}`
  );

  // Resume — skip entries whose target file already exists.
  const pending: PlanEntry[] = [];
  for (const e of entries) {
    const outPath = path.join(outRoot, `${e.slug}.mdx`);
    if (await fileExists(outPath)) continue;
    pending.push(e);
  }
  console.log(`[batch] pending after resume: ${pending.length}`);

  const take = args.limit > 0 ? pending.slice(0, args.limit) : pending;
  console.log(`[batch] will process: ${take.length}`);

  if (!args.template && !process.env.ANTHROPIC_API_KEY) {
    console.error(
      "[batch] ANTHROPIC_API_KEY not set. Re-run with --template to generate scaffolded drafts without Claude."
    );
    process.exit(1);
  }

  // Lazy import so --template mode doesn't require the Anthropic SDK.
  const claude = args.template
    ? null
    : await import("./lib/claude-body").then((m) => m.generateBodyWithClaude);

  let written = 0;
  let failed = 0;
  for (const [i, entry] of take.entries()) {
    try {
      const body = args.template
        ? buildTemplateBody(entry)
        : await claude!(entry);
      const outPath = await writeOne(entry, body, outRoot, args.dryRun);
      written += 1;
      console.log(
        `[batch] (${i + 1}/${take.length}) ${entry.publishedAt}  ${entry.slug}  → ${path.relative(process.cwd(), outPath)}`
      );
    } catch (err) {
      failed += 1;
      console.error(
        `[batch] FAILED ${entry.slug}:`,
        err instanceof Error ? err.message : err
      );
    }
    if (!args.template && i < take.length - 1) {
      await sleep(args.delayMs);
    }
  }

  console.log(
    `[batch] done — written=${written}, failed=${failed}, skipped=${entries.length - take.length}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
