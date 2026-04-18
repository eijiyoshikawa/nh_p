import { categories } from "@/lib/categories";
import { getAllArticles } from "@/lib/content";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { site } from "@/lib/site";

export default async function HomePage() {
  const articles = await getAllArticles();
  const latest = articles.slice(0, 6);

  return (
    <div>
      <section className="bg-gradient-to-b from-orange-50 to-[#FFFBF5]">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h1 className="text-3xl font-bold text-stone-900 md:text-4xl">
            枚方市の子育てを、もっと楽しく
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-stone-600 md:text-base">
            {site.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-stone-900">カテゴリから探す</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-stone-900">新着記事</h2>
        {latest.length === 0 ? (
          <p className="mt-4 text-sm text-stone-600">
            記事を準備中です。最初の記事がもうすぐ公開されます。
          </p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
