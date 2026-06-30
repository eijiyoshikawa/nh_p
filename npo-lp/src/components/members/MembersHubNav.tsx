import Link from "next/link";

const items = [
  {
    href: "/members",
    icon: "👥",
    title: "メンバー紹介",
    desc: "個性診断・組織傾向",
  },
  {
    href: "/members/calendar",
    icon: "📅",
    title: "活動カレンダー",
    desc: "開催予定・イベント",
  },
  {
    href: "/members/board",
    icon: "📣",
    title: "お知らせ",
    desc: "メンバー向け連絡",
  },
  {
    href: "/members/tasks",
    icon: "✅",
    title: "タスク・役割",
    desc: "担当と進捗の共有",
  },
  {
    href: "/members/docs",
    icon: "📄",
    title: "資料・議事録",
    desc: "ミーティング記録ほか",
  },
  {
    href: "/members/dashboard",
    icon: "📊",
    title: "ダッシュボード",
    desc: "資金調達・助成金",
  },
];

export function MembersHubNav({ className = "" }: { className?: string }) {
  return (
    <nav className={className}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="group flex items-center gap-3 rounded-2xl border-2 border-green-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
            >
              <span aria-hidden className="text-3xl">
                {it.icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-text-primary group-hover:text-accent-orange">
                  {it.title}
                </p>
                <p className="truncate text-xs text-text-secondary">{it.desc}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
