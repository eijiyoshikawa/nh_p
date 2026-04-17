import type { CategorySlug, SubcategorySlug } from "./categories";
import type { AreaSlug } from "./areas";
import type { AgeTagSlug, ThemeTagSlug } from "./tags";

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
};

export type Spot = {
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
  url?: string;
  tel?: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type Source = {
  title: string;
  url: string;
};

export type ArticleFrontmatter = {
  title: string;
  description: string;
  category: CategorySlug;
  subcategory?: SubcategorySlug;
  areaTags?: AreaSlug[];
  ageTags?: AgeTagSlug[];
  themeTags?: ThemeTagSlug[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  heroImage?: { src: string; alt: string };
  faq?: FaqItem[];
  spots?: Spot[];
  sources?: Source[];
  draft?: boolean;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  body: string;
};
