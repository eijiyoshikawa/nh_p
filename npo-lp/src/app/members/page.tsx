import type { Metadata } from "next";
import Link from "next/link";
import { members, diagnosisFor, GROUP_LABELS } from "@/lib/members";
import { GroupChart } from "@/components/members/GroupChart";
import { AnimalChart } from "@/components/members/AnimalChart";

export const metadata: Metadata = {
  title: "メンバー — ひらかた子ども食堂支援NPO",
  description: "理事・スタッフ一人ひとりの素質と組織全体の傾向を可視化したページ。",
  robots: { index: false, follow: false },
};

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <header className="border-b border-green-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-sm font-bold text-accent-orange hover:underline"
          >
            ← トップへ戻る
          </Link>
          <p className="text-xs font-semibold tracking-widest text-text-secondary">
            MEMBERS ONLY
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-xs font-semibold tracking-widest text-accent-orange">
          MEMBERS / 個性診断
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text-primary md:text-4xl">
          メンバー一覧と個性傾向
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-text-secondary">
          各メンバーの生年月日から動物占い（個性心理學）で算出した個性、ならびに本人の自己申告による意思決定軸（MOON/EARTH/SUN）をまとめています。組織全体の傾向は本ページ上部のチャートをご覧ください。
        </p>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <GroupChart />
          <AnimalChart />
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-bold text-text-primary">メンバー一覧（{members.length}名）</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => {
              const dx = diagnosisFor(m);
              const groupInfo = GROUP_LABELS[m.selfReportedGroup];
              return (
                <li key={m.slug}>
                  <Link
                    href={`/members/${m.slug}/`}
                    className="group flex h-full flex-col rounded-2xl border border-green-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="text-4xl">
                        {dx?.emoji ?? "👤"}
                      </span>
                      <div>
                        <p className="text-base font-bold text-text-primary group-hover:text-accent-orange">
                          {m.name}
                        </p>
                        <p className="text-xs text-text-secondary">{m.furigana}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 font-semibold ${groupInfo.tone}`}
                      >
                        {groupInfo.label}
                      </span>
                      {dx && (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 font-semibold text-green-700">
                          {dx.animalName} #{dx.number}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                      {m.occupation}
                    </p>

                    <span className="mt-auto pt-3 text-xs font-semibold text-accent-orange opacity-0 transition group-hover:opacity-100">
                      詳しく見る →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
