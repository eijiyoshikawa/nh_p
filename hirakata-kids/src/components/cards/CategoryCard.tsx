import Link from "next/link";
import type { Category } from "@/lib/categories";

const emoji: Record<string, string> = {
  parenting: "🎒",
  outings: "🌳",
  food: "🍙",
  health: "🩺",
  living: "🏠",
  community: "🤝",
};

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/${category.slug}/`}
      className="group block rounded-xl border border-orange-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-xl"
        >
          {emoji[category.slug] ?? "📘"}
        </span>
        <h3 className="text-lg font-bold text-stone-900 transition group-hover:text-[#F97316]">
          {category.label}
        </h3>
      </div>
      <p className="mt-3 text-sm text-stone-600">{category.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5 text-xs">
        {category.subcategories.slice(0, 4).map((s) => (
          <li
            key={s.slug}
            className="rounded-full bg-orange-50 px-2 py-0.5 text-orange-700"
          >
            {s.label}
          </li>
        ))}
      </ul>
    </Link>
  );
}
