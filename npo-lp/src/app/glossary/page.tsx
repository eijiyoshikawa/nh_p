import type { Metadata } from "next";
import Link from "next/link";
import {
  glossary,
  categoryLabels,
  categoryColors,
  type GlossaryItem,
} from "@/lib/glossary";

export const metadata: Metadata = {
  title: "用語集 — ひらかた子ども食堂支援NPO",
  description:
    "NPO・助成金・子ども食堂・事業に関する専門用語をわかりやすく解説。初めての方にも安心のガイド。",
};

const categoryOrder: GlossaryItem["category"][] = [
  "kodomo",
  "npo",
  "funding",
  "business",
];

export default function GlossaryPage() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    color: categoryColors[cat],
    items: glossary.filter((g) => g.category === cat),
  }));

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-green-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-bold text-[#F97316]">
            ← LPに戻る
          </Link>
          <div className="flex gap-3 text-xs">
            <Link
              href="/grants"
              className="font-medium text-stone-500 transition-colors hover:text-[#F97316]"
            >
              助成金リスト
            </Link>
            <Link
              href="/funding-strategy"
              className="font-medium text-stone-500 transition-colors hover:text-[#F97316]"
            >
              資金戦略
            </Link>
            <span className="font-medium text-[#22C55E]">用語集</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Title */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium tracking-widest text-[#22C55E] uppercase">
            はじめての方へ
          </p>
          <h1 className="text-2xl font-extrabold leading-snug text-stone-900 sm:text-3xl">
            用語集
          </h1>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#22C55E]" />
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-stone-500">
            NPO運営・助成金申請・子ども食堂に関する専門用語を、できるだけわかりやすく解説しています。
          </p>
        </div>

        {/* Category Jump */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {grouped.map((g) => (
            <a
              key={g.category}
              href={`#cat-${g.category}`}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-opacity hover:opacity-80 ${g.color}`}
            >
              {g.label}（{g.items.length}）
            </a>
          ))}
        </div>

        {/* Glossary */}
        {grouped.map((group) => (
          <div key={group.category} id={`cat-${group.category}`} className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-lg font-bold text-stone-900">
                {group.label}
              </h2>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-medium ${group.color}`}
              >
                {group.items.length}語
              </span>
            </div>

            <div className="space-y-3">
              {group.items.map((item) => (
                <div
                  key={item.term}
                  className="rounded-2xl bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="mb-2 flex flex-wrap items-baseline gap-2">
                    <h3 className="text-base font-bold text-stone-900">
                      {item.term}
                    </h3>
                    {item.reading && (
                      <span className="text-xs text-stone-400">
                        （{item.reading}）
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-stone-600">
                    {item.description}
                  </p>
                  {item.example && (
                    <p className="mt-2 rounded-lg bg-stone-50 px-3 py-2 text-xs leading-relaxed text-stone-500">
                      💡 {item.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="mt-16 rounded-2xl bg-stone-50 p-5 text-center">
          <p className="text-xs text-stone-500">
            わからない用語があれば、お気軽にお問い合わせください。
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link href="/grants" className="text-sm font-medium text-[#F97316] hover:underline">
              助成金リストを見る →
            </Link>
            <Link href="/funding-strategy" className="text-sm font-medium text-[#F97316] hover:underline">
              資金戦略を見る →
            </Link>
            <Link href="/" className="text-sm font-medium text-stone-500 hover:underline">
              LPトップに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
