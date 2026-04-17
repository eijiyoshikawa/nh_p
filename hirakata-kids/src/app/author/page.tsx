import type { Metadata } from "next";
import Link from "next/link";
import { authors } from "@/lib/authors";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "著者一覧",
  description: `${site.name}の記事を執筆している編集部・寄稿者の一覧。`,
  alternates: { canonical: `${site.url}/author/` },
};

export default function AuthorIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "著者" }]} />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        著者一覧
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        {site.name}の記事を執筆している編集部・寄稿者のご紹介です。
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {authors.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/author/${a.slug}/`}
              className="block rounded-xl border border-orange-100 bg-white p-5 transition hover:border-orange-300 hover:shadow-md"
            >
              <p className="text-xs text-stone-500">{a.role}</p>
              <p className="mt-1 text-base font-bold text-stone-900">
                {a.name}
              </p>
              <p className="mt-2 line-clamp-3 text-sm text-stone-600">
                {a.bio}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
