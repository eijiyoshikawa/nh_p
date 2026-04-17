import type { Article } from "@/lib/types";
import { ArticleCard } from "@/components/cards/ArticleCard";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-stone-900">関連記事</h2>
      <p className="mt-1 text-sm text-stone-500">
        同じテーマ・エリアのおすすめ記事
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
