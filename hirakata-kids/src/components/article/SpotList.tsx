import type { Spot } from "@/lib/types";

export function SpotList({ items }: { items: Spot[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-stone-900">スポット情報</h2>
      <ul className="mt-4 divide-y divide-orange-100 overflow-hidden rounded-lg border border-orange-100 bg-white">
        {items.map((s, i) => (
          <li key={`${s.name}-${i}`} className="p-4">
            <p className="text-sm font-semibold text-stone-900">{s.name}</p>
            <dl className="mt-2 grid gap-1 text-xs text-stone-600 sm:grid-cols-[6rem_1fr]">
              {s.address && (
                <>
                  <dt className="font-medium text-stone-500">住所</dt>
                  <dd>{s.address}</dd>
                </>
              )}
              {s.tel && (
                <>
                  <dt className="font-medium text-stone-500">電話</dt>
                  <dd>
                    <a href={`tel:${s.tel}`} className="text-[#F97316] hover:underline">
                      {s.tel}
                    </a>
                  </dd>
                </>
              )}
              {s.url && (
                <>
                  <dt className="font-medium text-stone-500">公式サイト</dt>
                  <dd className="break-all">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#F97316] hover:underline"
                    >
                      {s.url}
                    </a>
                  </dd>
                </>
              )}
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
