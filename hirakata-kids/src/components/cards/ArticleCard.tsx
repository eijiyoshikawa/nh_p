import Link from "next/link";
import type { Article } from "@/lib/types";
import { getCategory } from "@/lib/categories";
import { getArticleUrl } from "@/lib/content";

export function ArticleCard({ article }: { article: Article }) {
  const cat = getCategory(article.category);
  return (
    <Link
      href={getArticleUrl(article)}
      className="group relative flex h-full flex-col rounded-lg border border-orange-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
    >
      <div className="flex items-center gap-2 text-xs">
        {cat && (
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-orange-700">
            {cat.label}
          </span>
        )}
        <time className="text-stone-500" dateTime={article.publishedAt}>
          {article.publishedAt}
        </time>
      </div>
      <h3 className="mt-3 text-base font-bold leading-snug text-stone-900 transition group-hover:text-[#F97316]">
        {article.title}
      </h3>
      {article.description && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-600">
          {article.description}
        </p>
      )}
      <span
        aria-hidden
        className="mt-auto pt-3 text-xs font-semibold text-[#F97316] opacity-0 transition group-hover:opacity-100"
      >
        続きを読む →
      </span>
    </Link>
  );
}
