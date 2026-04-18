import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas, getArea } from "@/lib/areas";
import { categories } from "@/lib/categories";
import { getArticlesByArea } from "@/lib/content";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return {
    title: `${area.label}の子育て情報`,
    description: area.description,
    alternates: { canonical: `${site.url}/area/${area.slug}/` },
  };
}

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const articles = await getArticlesByArea(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "エリア", href: "/area/" },
          { label: area.label },
        ]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        {area.label}の子育て情報
      </h1>
      <p className="mt-2 text-sm text-stone-600">{area.description}</p>

      <section className="mt-8">
        {articles.length === 0 ? (
          <div className="rounded-xl border border-orange-100 bg-white p-6">
            <p className="text-sm text-stone-700">
              {area.label}エリアの記事を準備中です。近日公開予定。
            </p>
            <p className="mt-2 text-sm text-stone-600">
              まずはカテゴリから関連情報をチェックしてみてください。
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}/`}
                    className="inline-block rounded-full border border-orange-200 bg-white px-3 py-1 text-orange-700 transition hover:bg-orange-50"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: `${site.url}/` },
              { name: "エリア", url: `${site.url}/area/` },
              { name: area.label, url: `${site.url}/area/${area.slug}/` },
            ])
          ),
        }}
      />
    </div>
  );
}
