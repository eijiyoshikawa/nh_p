import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Icon from "@/components/Icon";
import { sortedNews, formatDate } from "@/lib/news";

export default function NewsPreview() {
  const items = sortedNews.slice(0, 3);
  return (
    <section id="news" className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-brand">NEWS</p>
              <h2 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">お知らせ</h2>
            </div>
            <Link href="/news" className="text-sm font-bold text-brand hover:underline">
              一覧へ →
            </Link>
          </div>
        </ScrollReveal>
        <ul className="divide-y divide-ink/5 rounded-3xl border-2 border-ink/5 bg-white">
          {items.map((n, i) => (
            <ScrollReveal key={n.slug} delay={i * 80}>
              <li>
                <Link
                  href={`/news/${n.slug}`}
                  className="group flex flex-col gap-1 px-6 py-5 transition hover:bg-paper-2 sm:flex-row sm:items-center sm:gap-5"
                >
                  <span className="text-xs font-bold text-ink-3">{formatDate(n.date)}</span>
                  <span className="w-fit rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand">
                    {n.category}
                  </span>
                  <span className="font-bold text-ink">{n.title}</span>
                  <Icon name="arrow" size={18} className="ml-auto hidden -translate-x-2 text-brand opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 sm:block" />
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
