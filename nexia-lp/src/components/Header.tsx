"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { nav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        scrolled || open
          ? "border-b border-ink/5 bg-paper/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-[padding] duration-300 sm:px-6 ${scrolled ? "py-2" : "py-3"}`}>
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="メインナビゲーション">
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link rounded-full px-3.5 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={nav.cta.href}
            className="ml-2 rounded-full bg-brand px-5 py-2 text-sm font-bold text-white shadow-md shadow-brand/20 transition hover:bg-brand-dark"
          >
            {nav.cta.label}
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="animate-fade-in-up border-t border-ink/5 bg-paper px-4 pb-6 pt-2 lg:hidden" aria-label="モバイルナビゲーション">
          <div className="flex flex-col">
            {nav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink/5 py-3.5 text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={nav.cta.href}
              className="mt-4 rounded-full bg-brand py-3.5 text-center text-base font-bold text-white"
              onClick={() => setOpen(false)}
            >
              {nav.cta.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
