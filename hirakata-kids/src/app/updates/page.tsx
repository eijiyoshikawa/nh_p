import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { getAllArticles } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "新着・更新一覧",
  description: `${site.name}の最新記事と更新履歴。`,
  alternates: { canonical: `${site.url}/updates/` },
};

export default async function UpdatesPage() {
  const articles = await getAllArticles();
  const months = new Map<string, typeof articles>();
  for (const a of articles) {
    const key = a.publishedAt.slice(0, 7); // YYYY-MM
    const list = months.get(key) ?? [];
    list.push(a);
    months.set(key, list);
  }
  const ordered = Array.from(months.entries()).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "新着・更新" }]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        新着・更新一覧
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        最新記事と直近の更新を月別にまとめています。
      </p>

      {ordered.length === 0 ? (
        <p className="mt-8 text-sm text-stone-600">記事を準備中です。</p>
      ) : (
        <div className="mt-10 space-y-10">
          {ordered.map(([month, list]) => (
            <section key={month}>
              <div className="flex items-baseline gap-3">
                <h2 className="text-lg font-bold text-stone-900">{month}</h2>
                <span className="text-xs text-stone-500">{list.length}本</span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: `${site.url}/` },
              { name: "新着・更新", url: `${site.url}/updates/` },
            ])
          ),
        }}
      />
    </div>
  );
}
