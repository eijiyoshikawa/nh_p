import Link from "next/link";
import type { Category } from "@/lib/categories";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/${category.slug}/`}
      className="group block rounded-xl border border-orange-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg"
    >
      <h3 className="text-lg font-bold text-stone-900 transition group-hover:text-[#F97316]">
        {category.label}
      </h3>
      <p className="mt-2 text-sm text-stone-600">{category.description}</p>
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
