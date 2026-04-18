import type { TocItem } from "@/lib/article-meta";

export function Toc({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;
  return (
    <nav
      aria-label="目次"
      className="mt-6 rounded-lg border border-orange-100 bg-orange-50/60 p-4"
    >
      <p className="text-sm font-semibold text-stone-900">目次</p>
      <ol className="mt-3 space-y-1.5 text-sm">
        {items.map((item, i) => (
          <li
            key={`${item.id}-${i}`}
            className={item.level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${item.id}`}
              className="text-stone-700 hover:text-[#F97316] hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
