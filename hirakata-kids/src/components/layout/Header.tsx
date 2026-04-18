"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu on route change — setState during render is the
  // idiomatic way to derive state from a changing prop/hook value.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-lg font-bold text-[#F97316]"
        >
          <span>{site.name}</span>
          <span className="hidden text-xs font-normal text-stone-500 sm:inline">
            {site.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {categories.map((c) => {
            const active = pathname?.startsWith(`/${c.slug}`);
            return (
              <Link
                key={c.slug}
                href={`/${c.slug}/`}
                className={
                  active
                    ? "font-semibold text-[#F97316]"
                    : "text-stone-700 transition hover:text-[#F97316]"
                }
                aria-current={active ? "page" : undefined}
              >
                {c.label}
              </Link>
            );
          })}
          <Link
            href="/area/"
            className={
              pathname?.startsWith("/area")
                ? "font-semibold text-[#F97316]"
                : "text-stone-500 transition hover:text-[#F97316]"
            }
          >
            エリア
          </Link>
          <Link
            href="/search/"
            className="rounded-full border border-stone-200 px-3 py-1 text-stone-600 transition hover:border-orange-300 hover:text-[#F97316]"
            aria-label="記事を検索"
          >
            検索
          </Link>
          <Link
            href="/newsletter/"
            className="rounded-full bg-[#F97316] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#ea6a0e]"
          >
            メルマガ登録
          </Link>
        </nav>

        <button
          type="button"
          aria-label="メニューを開く"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-orange-200 text-stone-700 transition hover:bg-orange-50 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
            {open ? (
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path d="M3 5h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-orange-100 bg-white md:hidden"
        >
          <nav className="mx-auto max-w-6xl px-4 py-3">
            <ul className="grid gap-1 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}/`}
                    className="block rounded-md px-3 py-2 text-stone-800 hover:bg-orange-50"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-orange-100 pt-2">
                <Link
                  href="/area/"
                  className="block rounded-md px-3 py-2 text-stone-700 hover:bg-orange-50"
                >
                  エリアから探す
                </Link>
              </li>
              <li>
                <Link
                  href="/feature/"
                  className="block rounded-md px-3 py-2 text-stone-700 hover:bg-orange-50"
                >
                  特集シリーズ
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/"
                  className="block rounded-md px-3 py-2 text-stone-700 hover:bg-orange-50"
                >
                  ツール
                </Link>
              </li>
              <li>
                <Link
                  href="/search/"
                  className="block rounded-md bg-orange-50 px-3 py-2 font-semibold text-[#F97316] hover:bg-orange-100"
                >
                  記事を検索
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter/"
                  className="block rounded-md bg-[#F97316] px-3 py-2 font-semibold text-white hover:bg-[#ea6a0e]"
                >
                  メルマガ登録（無料）
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
