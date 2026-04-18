/**
 * Batch-generate article MDX drafts from scripts/plan.json.
 *
 * Usage:
 *   # Template mode (no API calls — scaffolded drafts with TODO markers)
 *   npm run batch -- --provider=template
 *
 *   # Claude mode (requires ANTHROPIC_API_KEY)
 *   npm run batch -- --provider=claude
 *
 *   # Gemini mode (free tier, requires GEMINI_API_KEY)
 *   npm run batch -- --provider=gemini
 *
 *   # Common flags
 *   npm run batch -- --limit=20                    # first 20 unresolved entries
 *   npm run batch -- --from-date=2025-04-01
 *   npm run batch -- --to-date=2025-12-31
 *   npm run batch -- --plan=scripts/plan.json
 *   npm run batch -- --dry-run                     # print what would be written
 *   npm run batch -- --delay=6500                  # override inter-request delay (ms)
 *
 * Behaviour:
 *   - Entries whose target MDX already exists are skipped (resume-safe).
 *   - Template mode never talks to the network.
 *   - Claude mode defaults to 500ms delay; Gemini defaults to 6500ms to
 *     stay inside the 10 RPM free-tier cap for gemini-2.5-flash.
 *   - `--template` is accepted as a legacy alias for `--provider=template`.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import type { Plan, PlanEntry } from "./lib/topic-types";
import { buildFrontmatter } from "./lib/frontmatter";
import { buildTemplateBody } from "./lib/body-template";

type Provider = "template" | "claude" | "gemini";

type Args = {
  plan: string;
  provider: Provider;
  dryRun: boolean;
  limit: number;
  fromDate?: string;
  toDate?: string;
  delayMs: number;
};

function parseProvider(argv: string[]): Provider {
  const get = (name: string): string | undefined => {
    const found = argv.find((a) => a.startsWith(`--${name}=`));
    return found ? found.slice(name.length + 3) : undefined;
  };
  const explicit = get("provider");
  if (explicit === "template" || explicit === "claude" || explicit === "gemini") {
    return explicit;
  }
  if (argv.includes("--template")) return "template";
  // Default: template (zero cost, safest).
  return "template";
}

function defaultDelayFor(provider: Provider): number {
  switch (provider) {
    case "gemini":
      return 6500; // ~9 RPM, inside the 10 RPM free-tier cap
    case "claude":
      return 500;
    case "template":
      return 0;
  }
}

function parseArgs(argv: string[]): Args {
  const get = (name: string): string | undefined => {
    const found = argv.find((a) => a.startsWith(`--${name}=`));
    return found ? found.slice(name.length + 3) : undefined;
  };
  const has = (name: string): boolean =>
    argv.some((a) => a === `--${name}` || a.startsWith(`--${name}=`));

  const provider = parseProvider(argv);
  const explicitDelay = get("delay");
  return {
    plan: get("plan") ?? path.join("scripts", "plan.json"),
    provider,
    dryRun: has("dry-run"),
    limit: Number(get("limit") ?? 0) || 0,
    fromDate: get("from-date"),
    toDate: get("to-date"),
    delayMs: explicitDelay ? Number(explicitDelay) : defaultDelayFor(provider),
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

type BodyProducer = (entry: PlanEntry) => Promise<string> | string;

async function resolveProducer(provider: Provider): Promise<BodyProducer> {
  if (provider === "template") {
    return (entry) => buildTemplateBody(entry);
  }
  if (provider === "claude") {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error(
        "ANTHROPIC_API_KEY not set. Either `export ANTHROPIC_API_KEY=...` or run with --provider=template / --provider=gemini."
      );
    }
    const mod = await import("./lib/claude-body");
    return mod.generateBodyWithClaude;
  }
  // gemini
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY not set. Get a free key at https://aistudio.google.com/apikey"
    );
  }
  const mod = await import("./lib/gemini-body");
  return mod.generateBodyWithGemini;
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
    `[batch] plan=${planPath}, total=${plan.entries.length}, in-range=${entries.length}, provider=${args.provider}, delay=${args.delayMs}ms, dryRun=${args.dryRun}`
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

  const produce = await resolveProducer(args.provider);

  let written = 0;
  let failed = 0;
  for (const [i, entry] of take.entries()) {
    try {
      const body = await produce(entry);
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
    if (args.provider !== "template" && i < take.length - 1) {
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
