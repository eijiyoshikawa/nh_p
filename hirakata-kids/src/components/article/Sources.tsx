import type { Source } from "@/lib/types";

export function Sources({ items }: { items: Source[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10 border-t border-stone-200 pt-6">
      <h2 className="text-sm font-semibold text-stone-700">出典・参考</h2>
      <ul className="mt-2 space-y-1 text-sm">
        {items.map((s, i) => (
          <li key={i}>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-[#F97316] hover:underline"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
