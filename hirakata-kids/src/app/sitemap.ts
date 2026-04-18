import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { areas } from "@/lib/areas";
import { allTags } from "@/lib/tags";
import { authors } from "@/lib/authors";
import { features } from "@/lib/features";
import { getAllArticles, getArticleUrl } from "@/lib/content";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const articles = await getAllArticles();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/area/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tag/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/author/`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/feature/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/tools/school-map/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms/`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const authorUrls: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${base}/author/${a.slug}/`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/${c.slug}/`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const subcategoryUrls: MetadataRoute.Sitemap = categories.flatMap((c) =>
    c.subcategories.map((s) => ({
      url: `${base}/${c.slug}/${s.slug}/`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const areaUrls: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${base}/area/${a.slug}/`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const featureUrls: MetadataRoute.Sitemap = features.map((f) => ({
    url: `${base}/feature/${f.slug}/`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const tagUrls: MetadataRoute.Sitemap = allTags.map((t) => ({
    url: `${base}/tag/${t.slug}/`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}${getArticleUrl(a)}`,
    lastModified: a.updatedAt ?? a.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticUrls,
    ...categoryUrls,
    ...subcategoryUrls,
    ...areaUrls,
    ...tagUrls,
    ...authorUrls,
    ...featureUrls,
    ...articleUrls,
  ];
}
