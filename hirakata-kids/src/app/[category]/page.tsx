import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategory,
  isCategorySlug,
} from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/content";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.label}の記事一覧`,
    description: cat.description,
    alternates: { canonical: `${site.url}/${cat.slug}/` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();
  const cat = getCategory(category);
  if (!cat) notFound();

  const articles = await getArticlesByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: cat.label },
        ]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        {cat.label}
      </h1>
      <p className="mt-2 text-sm text-stone-600">{cat.description}</p>

      <section className="mt-6">
        <h2 className="text-sm font-semibold text-stone-700">サブカテゴリから探す</h2>
        <ul className="mt-2 flex flex-wrap gap-2 text-xs">
          {cat.subcategories.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${cat.slug}/${s.slug}/`}
                className="inline-block rounded-full border border-orange-200 bg-white px-3 py-1 text-orange-700 transition hover:bg-orange-50 hover:border-orange-300"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-stone-900">記事</h2>
        {articles.length === 0 ? (
          <p className="mt-4 text-sm text-stone-600">
            このカテゴリの記事は準備中です。
          </p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
