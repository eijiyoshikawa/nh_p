"use client";

import { useEffect, useState } from "react";
import { brand, nav } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Elevate header style when the user has scrolled past the hero threshold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-emerald-100/70 bg-white/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-white/0 backdrop-blur-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:py-5">
        <a
          href="#"
          className="flex items-baseline gap-2 press-scale"
          aria-label={brand.name}
        >
          <span
            className={`bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-base font-extrabold tracking-tight text-transparent sm:text-lg md:text-xl ${
              scrolled ? "" : "drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
            }`}
          >
            {brand.nameShort}
          </span>
          <span
            className={`hidden text-[11px] font-medium md:inline ${
              scrolled ? "text-text-secondary" : "text-white/80"
            }`}
          >
            Mirai Lab Nexia
          </span>
        </a>

        {/* Desktop nav — larger text, spacious */}
        <nav
          className={`hidden items-center gap-7 text-base font-medium md:flex ${
            scrolled ? "text-text-primary" : "text-white"
          }`}
        >
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative whitespace-nowrap py-1 transition-colors hover:text-emerald-400"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="/grants"
            className="group relative whitespace-nowrap py-1 transition-colors hover:text-emerald-400"
          >
            助成金リスト
            <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/funding-strategy"
            className="press-scale whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2 text-sm text-white shadow-md transition-all hover:scale-[1.03] hover:shadow-lg"
          >
            資金戦略
          </a>
        </nav>

        {/* Mobile hamburger — larger hit target */}
        <button
          className={`relative flex h-11 w-11 items-center justify-center rounded-xl md:hidden press-scale ${
            scrolled
              ? "text-text-primary hover:bg-emerald-50"
              : "text-white hover:bg-white/10"
          } transition-colors`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-6 rounded-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* soft accents */}
        <div
          className={`pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl transition-opacity duration-700 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl transition-opacity duration-700 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        <nav
          className={`relative flex h-full flex-col justify-center px-8 transition-all duration-500 ${
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          }`}
        >
          <div className="mb-12">
            <p className="text-[11px] font-medium tracking-[0.25em] text-emerald-300 uppercase">
              Menu
            </p>
            <p className="mt-2 text-2xl font-extrabold text-white">
              {brand.nameShort}
            </p>
          </div>

          <ul className="space-y-1">
            {[
              ...nav.items,
              { label: "助成金リスト", href: "/grants" },
              { label: "資金戦略", href: "/funding-strategy" },
              { label: "用語集", href: "/glossary" },
            ].map((item, i) => (
              <li
                key={item.href}
                className="transform transition-all duration-500"
                style={{
                  transitionDelay: `${open ? 150 + i * 50 : 0}ms`,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-16px)",
                }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 py-3 text-2xl font-bold text-white transition-colors hover:text-emerald-300"
                >
                  <span className="h-px w-6 bg-emerald-400 transition-all duration-300 group-hover:w-12" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-xs text-emerald-200/70">
            {brand.project}
          </p>
        </nav>
      </div>
    </header>
  );
}
