import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allTags, getTag } from "@/lib/tags";
import { getArticlesByTag } from "@/lib/content";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allTags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) return {};
  return {
    title: `${tag.label}の記事`,
    description: `「${tag.label}」タグが付いた枚方市の子育て情報記事一覧。`,
    alternates: { canonical: `${site.url}/tag/${tag.slug}/` },
  };
}

export default async function TagDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) notFound();

  const articles = await getArticlesByTag(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "タグ", href: "/tag/" },
          { label: tag.label },
        ]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        {tag.label}
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        「{tag.label}」タグが付いた記事一覧。
      </p>
      <section className="mt-8">
        {articles.length === 0 ? (
          <p className="text-sm text-stone-600">このタグの記事は準備中です。</p>
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
