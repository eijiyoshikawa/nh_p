import Link from "next/link";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";

export function Header() {
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
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}/`}
              className="text-stone-700 transition hover:text-[#F97316]"
            >
              {c.label}
            </Link>
          ))}
          <Link
            href="/area/"
            className="text-stone-500 transition hover:text-[#F97316]"
          >
            エリア
          </Link>
        </nav>
      </div>
    </header>
  );
}
