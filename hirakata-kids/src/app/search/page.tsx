import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllArticles, getArticleUrl } from "@/lib/content";
import { getCategory } from "@/lib/categories";
import { site } from "@/lib/site";
import { SearchClient, type SearchEntry } from "./SearchClient";

export const metadata: Metadata = {
  title: "記事を検索",
  description: `${site.name}の記事タイトル・概要・タグを横断検索できます。`,
  alternates: { canonical: `${site.url}/search/` },
  robots: { index: false, follow: true },
};

export default async function SearchPage() {
  const articles = await getAllArticles();
  const entries: SearchEntry[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    url: getArticleUrl(a),
    category: a.category,
    categoryLabel: getCategory(a.category)?.label ?? a.category,
    publishedAt: a.publishedAt,
    tags: [
      ...(a.themeTags ?? []),
      ...(a.ageTags ?? []),
      ...(a.areaTags ?? []),
    ],
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900 md:text-3xl">
        記事を検索
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        タイトル・概要・タグから記事を絞り込めます。
      </p>
      <Suspense fallback={<p className="mt-6 text-sm text-stone-500">読み込み中…</p>}>
        <SearchClient entries={entries} />
      </Suspense>
    </div>
  );
}
