"use client";

import { useState } from "react";
import { nav } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-emerald-100/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a
          href="#"
          className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-sm font-bold text-transparent"
        >
          ひらかたNPO
        </a>

        {/* Desktop nav */}
        <nav className="hidden gap-4 text-xs font-medium text-text-secondary md:flex">
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-accent-green"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/grants"
            className="whitespace-nowrap transition-colors hover:text-accent-green"
          >
            助成金リスト
          </a>
          <a
            href="/funding-strategy"
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1 text-white transition-colors hover:from-emerald-600 hover:to-emerald-700"
          >
            資金戦略
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-emerald-100/70 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-accent-green"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/grants"
              className="text-sm font-medium text-accent-green transition-colors hover:text-accent-green-dark"
              onClick={() => setOpen(false)}
            >
              助成金リスト
            </a>
            <a
              href="/funding-strategy"
              className="text-sm font-medium text-accent-green transition-colors hover:text-accent-green-dark"
              onClick={() => setOpen(false)}
            >
              資金戦略
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
