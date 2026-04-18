import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const host = new URL(site.url).host;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /search/?q= is never the canonical URL for any article — keep
        // crawl budget focused on evergreen content pages.
        disallow: ["/search/", "/_next/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host,
  };
}
