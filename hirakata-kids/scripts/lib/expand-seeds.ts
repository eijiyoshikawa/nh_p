import type { TopicSeed, PlanEntry } from "./topic-types";
import { areas, areaSlugs, type AreaSlug } from "../../src/lib/areas";

// A "candidate" is everything a PlanEntry needs EXCEPT the publishedAt
// date. The planner assigns dates afterwards.
export type Candidate = Omit<PlanEntry, "publishedAt">;

const areaLabelBySlug: Record<AreaSlug, string> = Object.fromEntries(
  areas.map((a) => [a.slug, a.label])
) as Record<AreaSlug, string>;

function slugifyTitleFragment(input: string): string {
  // For deterministic slugs we prefer romaji — but here we only need
  // uniqueness within a seed, so a simple transliteration of the area or
  // month is enough.
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function monthLabel(m: number): string {
  return `${String(m).padStart(2, "0")}`;
}

function renderTemplate(
  template: string,
  vars: { area?: string; month?: number }
): string {
  const rendered = template
    .replace("{area}", vars.area ?? "")
    .replace("{month}", vars.month !== undefined ? String(vars.month) : "");
  // Area labels like "枚方市駅周辺" already carry the city name; collapse
  // the redundant "枚方市枚方市" produced when a template prefixes its own
  // 枚方市 before inserting such an area label.
  return rendered.replace(/枚方市枚方市/g, "枚方市");
}

function universalCandidate(seed: TopicSeed, suffix: string | null): Candidate {
  const title = seed.baseTitle;
  const description = seed.baseDescription;
  const slug = suffix
    ? `${seed.id}-${slugifyTitleFragment(suffix)}`
    : seed.id;
  return {
    slug,
    category: seed.category,
    subcategory: seed.subcategory,
    title,
    description,
    areaTags: seed.areas ?? [],
    ageTags: seed.ageTags ?? [],
    themeTags: seed.themeTags ?? [],
    sources: seed.sources ?? [],
    seedId: seed.id,
    angle: seed.angle,
  };
}

function perAreaCandidates(seed: TopicSeed): Candidate[] {
  const targets: AreaSlug[] =
    seed.areas && seed.areas.length > 0 ? seed.areas : [...areaSlugs];
  return targets.map((area) => {
    const label = areaLabelBySlug[area];
    return {
      slug: `${seed.id}-${area}`,
      category: seed.category,
      subcategory: seed.subcategory,
      title: renderTemplate(seed.baseTitle, { area: label }),
      description: renderTemplate(seed.baseDescription, { area: label }),
      areaTags: [area],
      ageTags: seed.ageTags ?? [],
      themeTags: seed.themeTags ?? [],
      sources: seed.sources ?? [],
      seedId: seed.id,
      angle: seed.angle,
    } satisfies Candidate;
  });
}

function monthlyCandidates(seed: TopicSeed): Candidate[] {
  const months = seed.months && seed.months.length > 0 ? seed.months : [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ];
  return months.map((m) => ({
    slug: `${seed.id}-${monthLabel(m)}`,
    category: seed.category,
    subcategory: seed.subcategory,
    title: renderTemplate(seed.baseTitle, { month: m }),
    description: renderTemplate(seed.baseDescription, { month: m }),
    areaTags: seed.areas ?? [],
    ageTags: seed.ageTags ?? [],
    themeTags: seed.themeTags ?? [],
    sources: seed.sources ?? [],
    seedId: seed.id,
    angle: seed.angle,
  }));
}

export function expandSeeds(seeds: TopicSeed[]): Candidate[] {
  const out: Candidate[] = [];
  for (const seed of seeds) {
    if (seed.kind === "universal") {
      out.push(universalCandidate(seed, null));
    } else if (seed.kind === "per-area") {
      out.push(...perAreaCandidates(seed));
    } else if (seed.kind === "monthly") {
      out.push(...monthlyCandidates(seed));
    }
  }
  // Deduplicate slugs defensively — two seeds should never produce the
  // same slug, but if they do, keep the first and drop later collisions.
  const seen = new Set<string>();
  return out.filter((c) => {
    if (seen.has(c.slug)) return false;
    seen.add(c.slug);
    return true;
  });
}
