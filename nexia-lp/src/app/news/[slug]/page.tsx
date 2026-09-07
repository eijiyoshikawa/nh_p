import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { news, findNews, formatDate } from "@/lib/news";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findNews(slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default async function NewsDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = findNews(slug);
  if (!item) notFound();

  return (
    <article className="px-4 pb-20 pt-32 sm:px-6 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Link href="/news" className="text-xs font-bold text-brand hover:underline">
          ← お知らせ一覧
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <span className="text-xs font-bold text-ink-3">{formatDate(item.date)}</span>
          <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand">
            {item.category}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-tight text-ink sm:text-3xl md:text-4xl">
          {item.title}
        </h1>
        <div className="mt-10 space-y-5 text-sm leading-[1.9] text-ink sm:text-base">
          {item.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
