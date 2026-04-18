import type { TocItem } from "@/lib/article-meta";

export function Toc({
  items,
  variant = "inline",
}: {
  items: TocItem[];
  variant?: "inline" | "sticky";
}) {
  if (items.length < 2) return null;

  const list = (
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
  );

  if (variant === "sticky") {
    return (
      <nav
        aria-label="目次"
        className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg border border-orange-100 bg-white p-4"
      >
        <p className="text-sm font-semibold text-stone-900">目次</p>
        {list}
      </nav>
    );
  }

  // Inline variant: collapsible on mobile via <details>; expanded on md+.
  return (
    <details
      open
      className="group mt-6 rounded-lg border border-orange-100 bg-orange-50/60 p-4 md:[&_summary::after]:hidden"
    >
      <summary
        aria-label="目次の開閉"
        className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-stone-900 marker:hidden [&::-webkit-details-marker]:hidden"
      >
        目次
        <span
          aria-hidden
          className="text-xs text-stone-500 transition group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      {list}
    </details>
  );
}
