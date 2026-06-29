import type { Metadata } from "next";
import Link from "next/link";
import { grants, categoryLabels, type Grant } from "@/lib/grants";

export const metadata: Metadata = {
  title: "助成金・補助金リスト — ひらかた子ども食堂支援NPO",
  description:
    "大阪府枚方市のNPO法人が申請可能な助成金・補助金の一覧。枚方市・大阪府・国・民間財団の制度を網羅。",
};

const categoryOrder: Grant["category"][] = [
  "hirakata",
  "osaka",
  "national",
  "foundation",
];

const categoryColors: Record<Grant["category"], string> = {
  hirakata: "bg-blue-50 text-blue-700 ring-blue-200",
  osaka: "bg-purple-50 text-purple-700 ring-purple-200",
  national: "bg-red-50 text-red-700 ring-red-200",
  foundation: "bg-green-50 text-green-700 ring-green-200",
};

const priorityStyles: Record<Grant["priority"], string> = {
  high: "border-l-4 border-l-red-400",
  mid: "border-l-4 border-l-green-300",
  low: "border-l-4 border-l-stone-200",
};

const priorityLabels: Record<Grant["priority"], string> = {
  high: "最優先",
  mid: "推奨",
  low: "補完",
};

const priorityBadge: Record<Grant["priority"], string> = {
  high: "bg-red-100 text-red-700",
  mid: "bg-green-100 text-green-700",
  low: "bg-stone-100 text-stone-600",
};

export default function GrantsPage() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    items: grants.filter((g) => g.category === cat),
  }));

  const totalCount = grants.length;
  const highCount = grants.filter((g) => g.priority === "high").length;

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
              href="/funding-strategy"
              className="font-medium text-stone-500 transition-colors hover:text-[#F97316]"
            >
              資金戦略
            </Link>
            <span className="font-medium text-[#F97316]">助成金リスト</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Title */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium tracking-widest text-[#F97316] uppercase">
            大阪府枚方市限定
          </p>
          <h1 className="text-2xl font-extrabold leading-snug text-stone-900 sm:text-3xl">
            申請可能な助成金・補助金リスト
          </h1>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#F97316]" />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-500">
            枚方市で子ども食堂支援NPOが活用できる{totalCount}
            件の制度を、カテゴリ別・優先度別に整理しています。
          </p>
        </div>

        {/* Summary */}
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {grouped.map((g) => (
            <div
              key={g.category}
              className="rounded-2xl bg-white p-4 text-center shadow-sm"
            >
              <p className="text-2xl font-bold text-stone-900">
                {g.items.length}
                <span className="text-sm font-normal text-stone-500">件</span>
              </p>
              <p className="mt-1 text-xs text-stone-500">{g.label}</p>
            </div>
          ))}
        </div>

        {/* Priority Legend */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 text-xs">
          {(["high", "mid", "low"] as const).map((p) => (
            <span key={p} className="flex items-center gap-1.5">
              <span
                className={`inline-block rounded-full px-2 py-0.5 font-medium ${priorityBadge[p]}`}
              >
                {priorityLabels[p]}
              </span>
            </span>
          ))}
          <span className="text-stone-400">
            最優先 {highCount}件 / 全{totalCount}件
          </span>
        </div>

        {/* Grants by Category */}
        {grouped.map((group) => (
          <div key={group.category} className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-lg font-bold text-stone-900">
                {group.label}の制度
              </h2>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-medium ring-1 ${categoryColors[group.category]}`}
              >
                {group.items.length}件
              </span>
            </div>

            <div className="space-y-3">
              {group.items.map((grant) => (
                <GrantCard key={grant.id} grant={grant} />
              ))}
            </div>
          </div>
        ))}

        {/* Footer note */}
        <div className="mt-16 rounded-2xl bg-stone-50 p-5 text-center">
          <p className="text-xs text-stone-500">
            本リストは2026年4月時点の調査に基づきます。制度は年度ごとに変更される可能性があるため、申請前に必ず公式サイトで最新情報をご確認ください。
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link
              href="/funding-strategy"
              className="text-sm font-medium text-[#F97316] hover:underline"
            >
              資金調達戦略を見る →
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-stone-500 hover:underline"
            >
              LPトップに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function GrantCard({ grant }: { grant: Grant }) {
  return (
    <div
      className={`rounded-2xl bg-white p-4 shadow-sm sm:p-5 ${priorityStyles[grant.priority]}`}
    >
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-stone-900 sm:text-base">
          {grant.name}
        </h3>
        <span
          className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadge[grant.priority]}`}
        >
          {priorityLabels[grant.priority]}
        </span>
      </div>

      <p className="mb-3 text-sm leading-relaxed text-stone-600">
        {grant.description}
      </p>

      <div className="grid gap-2 text-xs sm:grid-cols-2">
        <div className="flex gap-2">
          <span className="flex-shrink-0 font-medium text-stone-400">
            交付額
          </span>
          <span className="font-bold text-[#F97316]">{grant.amount}</span>
        </div>
        <div className="flex gap-2">
          <span className="flex-shrink-0 font-medium text-stone-400">
            補助率
          </span>
          <span className="text-stone-700">{grant.rate}</span>
        </div>
        <div className="flex gap-2">
          <span className="flex-shrink-0 font-medium text-stone-400">
            締切
          </span>
          <span className="text-stone-700">{grant.deadline}</span>
        </div>
        <div className="flex gap-2">
          <span className="flex-shrink-0 font-medium text-stone-400">
            窓口
          </span>
          <span className="text-stone-700">{grant.contact}</span>
        </div>
      </div>

      {grant.note && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700">
          {grant.note}
        </p>
      )}

      {grant.url && (
        <a
          href={grant.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs font-medium text-[#F97316] hover:underline"
        >
          公式サイト →
        </a>
      )}
    </div>
  );
}
