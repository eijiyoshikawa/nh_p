import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { sortedNews, formatDate } from "@/lib/news";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "ミライラボネクシアからのお知らせ・活動報告・募集情報。",
};

export default function NewsIndex() {
  return (
    <>
      <PageHeader eyebrow="NEWS" title="お知らせ" />
      <section className="px-4 py-14 sm:px-6 md:py-20">
        <ul className="mx-auto max-w-4xl divide-y divide-ink/5 rounded-3xl border-2 border-ink/5 bg-white">
          {sortedNews.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/news/${n.slug}`}
                className="block px-6 py-6 transition hover:bg-paper-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-ink-3">{formatDate(n.date)}</span>
                  <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand">
                    {n.category}
                  </span>
                </div>
                <p className="mt-2 text-base font-extrabold text-ink">{n.title}</p>
                <p className="mt-1 text-sm text-ink-2">{n.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
