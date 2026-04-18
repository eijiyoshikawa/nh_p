import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { features } from "@/lib/features";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getArticleBySlug } from "@/lib/content";
import type { Article } from "@/lib/types";

export const metadata: Metadata = {
  title: "特集シリーズ",
  description: `${site.name}の特集記事一覧。テーマ横断で記事をまとめて読めます。`,
  alternates: { canonical: `${site.url}/feature/` },
};

export default async function FeatureIndexPage() {
  const enriched = await Promise.all(
    features.map(async (f) => {
      const resolved = await Promise.all(
        f.articleSlugs.map((s) => getArticleBySlug(s))
      );
      const articles = resolved.filter((a): a is Article => a !== null);
      return { feature: f, articles };
    })
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "特集" },
        ]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        特集シリーズ
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        入学準備・夏休み・防災など、テーマ横断で記事をまとめた特集一覧です。
      </p>

      {features.length === 0 ? (
        <p className="mt-8 text-sm text-stone-600">特集を準備中です。</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {enriched.map(({ feature: f, articles }) => (
            <li key={f.slug}>
              <Link
                href={`/feature/${f.slug}/`}
                className="block rounded-xl border border-orange-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-stone-900">
                    {f.title}
                  </h2>
                  <span className="shrink-0 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                    {articles.length}本
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone-600">{f.description}</p>
                {articles.length > 0 && (
                  <ul className="mt-3 space-y-1 text-xs text-stone-500">
                    {articles.slice(0, 3).map((a) => (
                      <li key={a.slug} className="line-clamp-1">
                        ・{a.title}
                      </li>
                    ))}
                    {articles.length > 3 && (
                      <li className="text-orange-600">
                        ほか {articles.length - 3} 本
                      </li>
                    )}
                  </ul>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: `${site.url}/` },
              { name: "特集", url: `${site.url}/feature/` },
            ])
          ),
        }}
      />
    </div>
  );
}