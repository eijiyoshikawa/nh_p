import Link from "next/link";
import { getCategory } from "@/lib/categories";

// Surfaces the other subcategories within an article's category so
// readers can jump laterally. Rendered below the prev/next nav.
export function CategorySiblings({
  category,
  currentSub,
}: {
  category: string;
  currentSub?: string;
}) {
  const cat = getCategory(category);
  if (!cat) return null;
  const siblings = cat.subcategories.filter((s) => s.slug !== currentSub);
  if (siblings.length === 0) return null;
  return (
    <section className="mt-10">
      <p className="text-xs font-semibold text-stone-500">
        {cat.label}の他のサブカテゴリ
      </p>
      <ul className="mt-2 flex flex-wrap gap-2 text-xs">
        {siblings.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${cat.slug}/${s.slug}/`}
              className="inline-block rounded-full border border-orange-200 bg-white px-3 py-1 text-orange-700 transition hover:bg-orange-50"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
