import type { Metadata } from "next";
import { MembersSubHeader } from "@/components/members/MembersSubHeader";
import { documents, type DocCategory } from "@/lib/orgData";

export const metadata: Metadata = {
  title: "資料・議事録 — メンバー専用",
  robots: { index: false, follow: false },
};

const CATEGORIES: DocCategory[] = ["議事録", "資料", "申請書類", "その他"];
const ICON: Record<DocCategory, string> = {
  議事録: "📝",
  資料: "📄",
  申請書類: "🗂️",
  その他: "📎",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <MembersSubHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-semibold tracking-widest text-accent-orange">
          DOCUMENTS
        </p>
        <h1 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">
          資料・議事録
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          ミーティング記録や各種資料へのリンク集です。
        </p>

        <div className="mt-8 space-y-8">
          {CATEGORIES.map((cat) => {
            const items = documents.filter((d) => d.category === cat);
            if (items.length === 0) return null;
            return (
              <section key={cat}>
                <h2 className="text-sm font-bold text-text-primary">
                  {ICON[cat]} {cat}
                </h2>
                <ul className="mt-3 space-y-2">
                  {items.map((d, i) => (
                    <li
                      key={`${d.title}-${i}`}
                      className="rounded-xl border border-green-100 bg-white p-4 shadow-sm"
                    >
                      {d.url ? (
                        <a
                          href={d.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-text-primary group-hover:text-accent-orange">
                              {d.title}
                            </p>
                            {(d.date || d.note) && (
                              <p className="truncate text-xs text-text-secondary">
                                {d.date}
                                {d.date && d.note ? " ・ " : ""}
                                {d.note}
                              </p>
                            )}
                          </div>
                          <span className="shrink-0 text-xs font-semibold text-accent-orange">
                            開く →
                          </span>
                        </a>
                      ) : (
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-text-primary">
                              {d.title}
                            </p>
                            <p className="truncate text-xs text-text-secondary">
                              {d.note ?? "準備中"}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-xs text-text-secondary">
                            準備中
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <p className="mt-8 rounded-lg bg-green-50 p-3 text-xs leading-relaxed text-text-secondary">
          ※ 資料リンクは <code className="rounded bg-white px-1">src/lib/orgData.ts</code> の <code className="rounded bg-white px-1">documents</code> に追加して更新します。
        </p>
      </main>
    </div>
  );
}
