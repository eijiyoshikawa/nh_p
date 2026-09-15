import Link from "next/link";
import { app } from "@/lib/content";
import LogoutButton from "@/components/LogoutButton";

export default function AdultShell({ children, current }: { children: React.ReactNode; current: "list" | "stats" }) {
  const tab = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
        active ? "bg-ink text-white" : "text-ink-2 hover:bg-paper-2"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <div className="min-h-screen bg-paper-2">
      <header className="sticky top-0 z-30 border-b border-ink/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold text-ink">{app.name}</span>
            <span className="rounded-full bg-sky-soft px-2 py-0.5 text-[11px] font-bold text-sky-dark">大人用</span>
          </div>
          <nav className="flex items-center gap-1">
            {tab("/adults", "投稿一覧", current === "list")}
            {tab("/adults/stats", "傾向", current === "stats")}
            <a href="/api/adults/export" className="rounded-full px-4 py-2 text-sm font-bold text-ink-2 hover:bg-paper-2">
              CSV
            </a>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
