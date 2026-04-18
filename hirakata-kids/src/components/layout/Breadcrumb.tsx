import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="パンくず" className="text-xs text-stone-500">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.href ? (
              <Link
                href={item.href}
                className="transition hover:text-[#F97316]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-stone-700">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <span aria-hidden className="text-stone-300">
                ›
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
