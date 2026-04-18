// Type definitions for the batch article generation pipeline.
//
// The pipeline splits planning from generation so the plan can be reviewed
// (or edited by hand) before Claude calls are made. A single TopicSeed
// expands into multiple plan entries via:
//  - the `perArea` flag → one entry per area tag
//  - the `monthVariants` table → monthly framing for seasonal topics
// Each plan entry gets a unique `slug` and a `publishedAt` date.

import type { CategorySlug, SubcategorySlug } from "../../src/lib/categories";
import type { AreaSlug } from "../../src/lib/areas";
import type { AgeTagSlug, ThemeTagSlug } from "../../src/lib/tags";

export type TopicKind = "universal" | "per-area" | "monthly";

export type TopicSeed = {
  id: string;
  kind: TopicKind;
  category: CategorySlug;
  subcategory?: SubcategorySlug;
  baseTitle: string;
  baseDescription: string;
  // When set, limits the months in which this topic may be scheduled
  // (1-12, Asia/Tokyo calendar months).
  months?: number[];
  ageTags?: AgeTagSlug[];
  themeTags?: ThemeTagSlug[];
  // Area restriction for per-area topics. Omit to use all areas.
  areas?: AreaSlug[];
  // Explicit source URLs for this topic. Falls back to a generic pool
  // if empty.
  sources?: string[];
  // Angle of the article (guide / list / faq / interview). Used to
  // diversify prompts when the same topic is scheduled multiple times.
  angle?: "guide" | "list" | "faq" | "column";
};

export type PlanEntry = {
  slug: string;
  publishedAt: string; // YYYY-MM-DD
  category: CategorySlug;
  subcategory?: SubcategorySlug;
  title: string;
  description: string;
  areaTags: AreaSlug[];
  ageTags: AgeTagSlug[];
  themeTags: ThemeTagSlug[];
  sources: string[];
  seedId: string;
  angle?: TopicSeed["angle"];
};

export type Plan = {
  createdAt: string;
  from: string; // YYYY-MM-DD
  to: string;   // YYYY-MM-DD
  entries: PlanEntry[];
};
