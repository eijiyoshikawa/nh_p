import { getAllArticles, getArticleUrl } from "@/lib/content";
import { site } from "@/lib/site";

// Lightweight RSS 2.0 feed. Served at /rss.xml. Next.js 16 allows a
// plain Route Handler in src/app/<path>/route.ts to own the URL without
// needing `app/rss.xml.ts`.
export async function GET() {
  const articles = await getAllArticles();
  const latest = articles.slice(0, 30);

  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const items = latest
    .map((a) => {
      const url = `${site.url}${getArticleUrl(a)}`;
      const pubDate = new Date(`${a.publishedAt}T00:00:00+09:00`).toUTCString();
      return `    <item>
      <title>${escape(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escape(a.description ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)}</title>
    <link>${site.url}/</link>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escape(site.description)}</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
