import type { Candidate } from "./expand-seeds";
import type { PlanEntry } from "./topic-types";

export function dateRange(from: string, to: string): string[] {
  const out: string[] = [];
  const start = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error(`Invalid date range: ${from} → ${to}`);
  }
  for (let t = start.getTime(); t <= end.getTime(); t += 86400000) {
    out.push(new Date(t).toISOString().slice(0, 10));
  }
  return out;
}

function monthOf(iso: string): number {
  // ISO date in UTC — the month component is what we want for seasonal
  // matching under Asia/Tokyo (no DST, no day-boundary surprises here).
  return Number(iso.slice(5, 7));
}

// Seeded PRNG so the same plan file is reproducible across runs.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Monthly candidates (slug ends with -MM) carry an intended month. Use it
// to bias toward same-month slots when possible.
function candidateMonth(c: Candidate): number | null {
  const m = /-(\d{2})$/.exec(c.slug);
  if (!m) return null;
  const n = Number(m[1]);
  return n >= 1 && n <= 12 ? n : null;
}

// Sakura / kouyou style seeds declare months via the seed.months field;
// at expand time we drop that info, so we reintroduce a lookup from slug
// prefix via a hints map the caller can pass in.
export type MonthHint = { seedId: string; months: number[] };

export function planDates(
  candidates: Candidate[],
  dates: string[],
  opts: { seed?: number; hints?: MonthHint[] } = {}
): PlanEntry[] {
  if (candidates.length === 0 || dates.length === 0) return [];

  const rand = mulberry32(opts.seed ?? 42);
  const hintByStart = new Map<string, number[]>();
  for (const h of opts.hints ?? []) {
    hintByStart.set(h.seedId, h.months);
  }

  // Build a pool that cycles through the candidate list enough times to
  // cover every date, shuffled deterministically.
  const cycles = Math.ceil(dates.length / candidates.length);
  const pool: Candidate[] = [];
  for (let i = 0; i < cycles; i++) {
    pool.push(...shuffle(candidates, rand));
  }

  // Greedy assignment: for each date, prefer a candidate whose intended
  // month matches, otherwise take the next available from the pool.
  // Pool positions are consumed via `taken`, while duplicate base slugs
  // across pool cycles get numeric suffixes (-2, -3, ...) so every entry
  // ships with a filesystem-unique slug.
  const entries: PlanEntry[] = [];
  const taken = new Array(pool.length).fill(false);
  const usedSlugs = new Set<string>();
  const baseSlugCount = new Map<string, number>();

  const uniqueSlug = (base: string): string => {
    const n = (baseSlugCount.get(base) ?? 0) + 1;
    baseSlugCount.set(base, n);
    const candidate = n === 1 ? base : `${base}-${n}`;
    if (usedSlugs.has(candidate)) {
      // Very defensive — should never fire given the accumulator above.
      let k = n;
      let next = candidate;
      while (usedSlugs.has(next)) {
        k += 1;
        next = `${base}-${k}`;
      }
      baseSlugCount.set(base, k);
      usedSlugs.add(next);
      return next;
    }
    usedSlugs.add(candidate);
    return candidate;
  };

  for (const iso of dates) {
    const mo = monthOf(iso);

    // First pass: prefer same-month candidates (from -MM suffix or hints).
    let pickedIdx = -1;
    for (let i = 0; i < pool.length; i++) {
      if (taken[i]) continue;
      const c = pool[i];
      const cm = candidateMonth(c);
      const hintMonths = hintByStart.get(c.seedId);
      const wantsMonth =
        cm === mo || (hintMonths?.includes(mo) ?? false);
      if (wantsMonth) {
        pickedIdx = i;
        break;
      }
    }
    // Second pass: any unused candidate.
    if (pickedIdx === -1) {
      for (let i = 0; i < pool.length; i++) {
        if (!taken[i]) {
          pickedIdx = i;
          break;
        }
      }
    }
    if (pickedIdx === -1) {
      // Should not happen since we sized `pool` to cover `dates.length`.
      continue;
    }

    const base = pool[pickedIdx];
    taken[pickedIdx] = true;

    entries.push({
      ...base,
      slug: uniqueSlug(base.slug),
      publishedAt: iso,
    });
  }

  return entries;
}
