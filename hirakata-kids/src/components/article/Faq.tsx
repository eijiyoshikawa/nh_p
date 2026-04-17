import type { FaqItem } from "@/lib/types";

export function Faq({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12 rounded-xl border border-orange-100 bg-orange-50/40 p-6">
      <h2 className="text-xl font-bold text-stone-900">よくある質問</h2>
      <dl className="mt-4 divide-y divide-orange-100">
        {items.map((item, i) => (
          <div key={i} className="py-3">
            <dt className="font-semibold text-stone-900">Q. {item.q}</dt>
            <dd className="mt-1 text-sm text-stone-700">A. {item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
