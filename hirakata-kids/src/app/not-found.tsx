import Link from "next/link";
import { categories } from "@/lib/categories";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="text-xs font-semibold tracking-widest text-orange-600">
        404 NOT FOUND
      </p>
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        お探しのページが見つかりません
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-stone-600">
        URL が変わったか、記事が整理されて別のページに統合された可能性があります。
        下記から探し直してください。
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
        <Link
          href="/"
          className="rounded-full bg-[#F97316] px-5 py-2 font-semibold text-white transition hover:bg-[#ea6a0e]"
        >
          ホームに戻る
        </Link>
        <Link
          href="/search/"
          className="rounded-full border border-orange-200 bg-white px-5 py-2 font-semibold text-orange-700 transition hover:bg-orange-50"
        >
          記事を検索
        </Link>
      </div>

      <div className="mt-10 rounded-xl border border-orange-100 bg-white p-6 text-left">
        <p className="text-sm font-semibold text-stone-900">カテゴリから探す</p>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}/`}
                className="block rounded-md px-3 py-2 text-stone-700 transition hover:bg-orange-50 hover:text-[#F97316]"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
