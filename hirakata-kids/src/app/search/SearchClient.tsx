"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

export type SearchEntry = {
  slug: string;
  title: string;
  description: string;
  url: string;
  category: string;
  categoryLabel: string;
  publishedAt: string;
  tags: string[];
};

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "");
}

export function SearchClient({ entries }: { entries: SearchEntry[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);
  const [, startTransition] = useTransition();

  const results = useMemo(() => {
    const needle = normalize(q.trim());
    if (!needle) return entries;
    return entries.filter((e) => {
      const hay = normalize(
        [e.title, e.description, e.categoryLabel, ...e.tags].join(" ")
      );
      return hay.includes(needle);
    });
  }, [q, entries]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      const next = new URLSearchParams();
      if (q) next.set("q", q);
      router.replace(`/search/${next.size ? `?${next.toString()}` : ""}`);
    });
  }

  return (
    <div className="mt-6">
      <form onSubmit={onSubmit}>
        <label className="block">
          <span className="sr-only">検索キーワード</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="キーワード例: 小児科 / 公園 / 入学準備 / 無料"
            autoComplete="off"
            className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </label>
      </form>

      <p className="mt-3 text-xs text-stone-500">
        {q.trim() ? `${results.length}件ヒット` : `全${entries.length}件`}
      </p>

      <ul className="mt-4 divide-y divide-orange-100 rounded-lg border border-orange-100 bg-white">
        {results.length === 0 ? (
          <li className="p-5 text-sm text-stone-600">
            該当する記事が見つかりませんでした。別のキーワードでお試しください。
          </li>
        ) : (
          results.map((e) => (
            <li key={e.slug}>
              <Link
                href={e.url}
                className="block p-5 transition hover:bg-orange-50/60"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-orange-50 px-2 py-0.5 text-orange-700">
                    {e.categoryLabel}
                  </span>
                  <time className="text-stone-500">{e.publishedAt}</time>
                </div>
                <p className="mt-2 text-base font-bold text-stone-900">
                  {e.title}
                </p>
                {e.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-stone-600">
                    {e.description}
                  </p>
                )}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
