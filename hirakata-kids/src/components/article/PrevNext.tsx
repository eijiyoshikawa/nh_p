import Link from "next/link";
import type { Article } from "@/lib/types";
import { getArticleUrl } from "@/lib/content";

export function PrevNext({
  prev,
  next,
}: {
  prev: Article | null;
  next: Article | null;
}) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="カテゴリ内の前後記事"
      className="mt-10 grid gap-3 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={getArticleUrl(prev)}
          className="group block rounded-lg border border-orange-100 bg-white p-4 transition hover:border-orange-300 hover:shadow-sm"
        >
          <p className="text-xs font-semibold text-stone-500">← 前の記事</p>
          <p className="mt-1.5 line-clamp-2 text-sm font-bold text-stone-900 transition group-hover:text-[#F97316]">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div aria-hidden />
      )}
      {next ? (
        <Link
          href={getArticleUrl(next)}
          className="group block rounded-lg border border-orange-100 bg-white p-4 text-right transition hover:border-orange-300 hover:shadow-sm"
        >
          <p className="text-xs font-semibold text-stone-500">次の記事 →</p>
          <p className="mt-1.5 line-clamp-2 text-sm font-bold text-stone-900 transition group-hover:text-[#F97316]">
            {next.title}
          </p>
        </Link>
      ) : (
        <div aria-hidden />
      )}
    </nav>
  );
}
