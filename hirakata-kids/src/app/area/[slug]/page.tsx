import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { areas, getArea } from "@/lib/areas";
import { getArticlesByArea } from "@/lib/content";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

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
          <p className="text-sm text-stone-600">
            このエリアの記事は準備中です。
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
