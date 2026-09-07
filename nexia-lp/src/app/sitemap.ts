import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { news } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/concept", "/join", "/about", "/news", "/faq", "/contact", "/privacy"];
  const now = new Date();
  return [
    ...staticPages.map((p) => ({
      url: `${siteUrl}${p}`,
      lastModified: now,
      changeFrequency: (p === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p === "" ? 1 : 0.7,
    })),
    ...news.map((n) => ({
      url: `${siteUrl}/news/${n.slug}`,
      lastModified: new Date(n.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
