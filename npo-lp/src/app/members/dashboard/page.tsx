import type { Metadata } from "next";
import { MembersSubHeader } from "@/components/members/MembersSubHeader";
import {
  fundingGoal,
  grantApplications,
  yen,
  type GrantStatus,
} from "@/lib/orgData";

export const metadata: Metadata = {
  title: "ダッシュボード — メンバー専用",
  robots: { index: false, follow: false },
};

const STATUS_TONE: Record<GrantStatus, string> = {
  検討中: "bg-stone-100 text-stone-700",
  準備中: "bg-blue-100 text-blue-700",
  申請済み: "bg-amber-100 text-amber-700",
  採択: "bg-emerald-100 text-emerald-700",
  不採択: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const pct =
    fundingGoal.target > 0
      ? Math.min(100, Math.round((fundingGoal.raised / fundingGoal.target) * 100))
      : 0;

  return (
    <div className="min-h-screen bg-warm-bg">
      <MembersSubHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-xs font-semibold tracking-widest text-accent-orange">
          DASHBOARD
        </p>
        <h1 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">
          資金調達ダッシュボード
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          目標 {yen(fundingGoal.target)} に対する進捗と、助成金の申請状況です。
        </p>

        {/* Overall progress */}
        <section className="mt-8 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold text-text-primary">累計調達額</h2>
            <p className="text-sm text-text-secondary">
              {yen(fundingGoal.raised)} / {yen(fundingGoal.target)}
            </p>
          </div>
          <div className="mt-3 h-5 overflow-hidden rounded-full bg-stone-100">
            <div
              className="flex h-full items-center justify-end bg-gradient-to-r from-accent-green to-accent-green-dark pr-2 text-[10px] font-bold text-white transition-all"
              style={{ width: `${Math.max(pct, 4)}%` }}
            >
              {pct}%
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="mt-6">
          <h2 className="text-lg font-bold text-text-primary">年次マイルストーン</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {fundingGoal.milestones.map((m) => {
              const mp =
                m.target > 0
                  ? Math.min(100, Math.round((m.raised / m.target) * 100))
                  : 0;
              return (
                <div
                  key={m.year}
                  className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-bold text-text-primary">
                      {m.year}
                      <span className="ml-2 text-xs font-normal text-text-secondary">
                        {m.label}
                      </span>
                    </p>
                    <span className="text-xs text-text-secondary">{mp}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full bg-accent-green"
                      style={{ width: `${mp}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">
                    {yen(m.raised)} / {yen(m.target)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Grant applications */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-text-primary">助成金・補助金の状況</h2>
          <ul className="mt-3 space-y-2">
            {grantApplications.map((g) => (
              <li
                key={g.name}
                className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text-primary">{g.name}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {g.amount}
                      {g.deadline ? ` ・ ${g.deadline}` : ""}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_TONE[g.status]}`}
                  >
                    {g.status}
                  </span>
                </div>
                {g.note && (
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {g.note}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-green-50 p-3 text-xs leading-relaxed text-text-secondary">
            ※ 数値・ステータスは <code className="rounded bg-white px-1">src/lib/orgData.ts</code> を編集して更新します。
          </p>
        </section>
      </main>
    </div>
  );
}
