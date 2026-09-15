import Link from "next/link";
import { app } from "@/lib/content";
import Icon from "@/components/Icon";

// 子ども側の共通枠。ナビは最小限（もどる／おとなのかたへ）。
export default function KidShell({
  children,
  back,
}: {
  children: React.ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-4">
        {back ? (
          <Link href={back.href} className="tap inline-flex items-center gap-1 rounded-full px-3 text-sm font-bold text-ink-2">
            <Icon name="arrow" size={18} className="rotate-180" />
            {back.label}
          </Link>
        ) : (
          <span />
        )}
        <Link href="/" className="flex items-center gap-2" aria-label={app.name}>
          <PostIcon size={28} />
          <span className="text-base font-extrabold text-ink">{app.name}</span>
        </Link>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16">{children}</main>
      <footer className="mx-auto w-full max-w-2xl px-4 pb-8 text-center text-xs text-ink-3">
        <Link href="/about" className="underline">
          おとなのかたへ（このポストについて）
        </Link>
        <p className="mt-2">{app.operator}</p>
      </footer>
    </div>
  );
}

export function PostIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <rect width="64" height="64" rx="16" fill="#3B82F6" />
      <rect x="14" y="20" width="36" height="28" rx="6" fill="#fff" />
      <rect x="14" y="20" width="36" height="8" rx="4" fill="#FBBF24" />
      <rect x="26" y="30" width="12" height="3" rx="1.5" fill="#3B82F6" />
    </svg>
  );
}
