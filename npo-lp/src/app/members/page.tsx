import type { Metadata } from "next";
import Link from "next/link";
import { BASE_ANIMALS, GROUP_LABELS, members } from "@/lib/members";
import { GroupChart } from "@/components/members/GroupChart";
import { AnimalChart } from "@/components/members/AnimalChart";
import { AxisChart } from "@/components/members/AxisChart";
import { MemberAvatar } from "@/components/members/MemberAvatar";
import { MembersHubNav } from "@/components/members/MembersHubNav";
import { LogoutButton } from "@/components/members/LogoutButton";

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
          <div className="flex items-center gap-3">
            <p className="hidden text-xs font-semibold tracking-widest text-text-secondary sm:block">
              MEMBERS ONLY
            </p>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-xs font-semibold tracking-widest text-accent-orange">
          MEMBERS HUB
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text-primary md:text-4xl">
          メンバー専用ページ
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-text-secondary">
          活動の運営に必要な情報をまとめたメンバー限定エリアです。下のメニューから各機能にアクセスできます。
        </p>

        <MembersHubNav className="mt-8" />

        <h2 className="mt-16 text-2xl font-bold text-text-primary">組織の傾向</h2>
        <p className="mt-2 max-w-2xl text-sm text-text-secondary">
          noa-group の動物占い（個性心理學）で各メンバーの個性を、Google Form による自己申告で意思決定軸（MOON/EARTH/SUN）をまとめています。
        </p>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <GroupChart />
          <AnimalChart />
        </section>

        <section className="mt-6">
          <AxisChart />
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-bold text-text-primary">メンバー一覧（{members.length}名）</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => {
              const base = BASE_ANIMALS[m.character.base];
              const groupInfo = GROUP_LABELS[m.selfReportedGroup];
              return (
                <li key={m.slug}>
                  <Link
                    href={`/members/${m.slug}/`}
                    className="group flex h-full flex-col rounded-2xl border border-green-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <MemberAvatar
                        photoId={m.photoId}
                        emoji={base.emoji}
                        name={m.name}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-base font-bold text-text-primary group-hover:text-accent-orange">
                            {m.name}
                          </p>
                          {m.role === "理事長" && (
                            <span className="shrink-0 rounded-full bg-accent-orange px-1.5 py-0.5 text-[10px] font-bold text-white">
                              {m.role}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-secondary">{m.furigana}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm font-bold text-text-primary">
                      {base.emoji} {m.character.fullName}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 font-semibold ${groupInfo.tone}`}
                      >
                        自己申告: {groupInfo.label}
                      </span>
                      {m.role !== "理事長" && (
                        <span className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-text-secondary">
                          {m.role}
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
