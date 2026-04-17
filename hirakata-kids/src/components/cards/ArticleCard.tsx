import Link from "next/link";
import type { Article } from "@/lib/types";
import { getCategory } from "@/lib/categories";

export function ArticleCard({ article }: { article: Article }) {
  const cat = getCategory(article.category);
  return (
    <Link
      href={`/${article.category}/${article.slug}/`}
      className="group block rounded-lg border border-orange-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
    >
      <div className="flex items-center gap-2 text-xs">
        {cat && (
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-orange-700">
            {cat.label}
          </span>
        )}
        <time className="text-stone-500">{article.publishedAt}</time>
      </div>
      <h3 className="mt-3 text-base font-bold text-stone-900 transition group-hover:text-[#F97316]">
        {article.title}
      </h3>
      {article.description && (
        <p className="mt-2 line-clamp-3 text-sm text-stone-600">
          {article.description}
        </p>
      )}
    </Link>
  );
}
