"use client";

import { useMemo, useState } from "react";
import type { School, SchoolKind } from "@/lib/schools";
import type { Area } from "@/lib/areas";

type KindFilter = "all" | SchoolKind;

const kindOptions: { value: KindFilter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "elementary", label: "小学校" },
  { value: "junior-high", label: "中学校" },
];

export function SchoolMapClient({
  schools,
  areas,
}: {
  schools: School[];
  areas: Area[];
}) {
  const [area, setArea] = useState<string>("all");
  const [kind, setKind] = useState<KindFilter>("all");

  const filtered = useMemo(
    () =>
      schools.filter(
        (s) =>
          (area === "all" || s.area === area) &&
          (kind === "all" || s.kind === kind)
      ),
    [schools, area, kind]
  );

  const grouped = useMemo(() => {
    const m = new Map<string, School[]>();
    for (const s of filtered) {
      const list = m.get(s.area) ?? [];
      list.push(s);
      m.set(s.area, list);
    }
    return m;
  }, [filtered]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col text-xs font-semibold text-stone-700">
          エリア
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="mt-1 rounded-md border border-orange-200 bg-white px-3 py-2 text-sm text-stone-900"
          >
            <option value="all">すべて</option>
            {areas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-xs font-semibold text-stone-700">
          校種
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as KindFilter)}
            className="mt-1 rounded-md border border-orange-200 bg-white px-3 py-2 text-sm text-stone-900"
          >
            {kindOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <p className="ml-auto text-xs text-stone-500">
          {filtered.length}校該当
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-lg border border-orange-100 bg-white p-5 text-sm text-stone-600">
          条件に該当する学校がありません。
        </p>
      ) : (
        <div className="mt-6 space-y-6">
          {areas
            .filter((a) => (grouped.get(a.slug) ?? []).length > 0)
            .map((a) => {
              const list = grouped.get(a.slug) ?? [];
              return (
                <section
                  key={a.slug}
                  className="rounded-lg border border-orange-100 bg-white p-5"
                >
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-base font-bold text-stone-900">
                      {a.label}
                    </h2>
                    <span className="text-xs text-stone-500">
                      {list.length}校
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-stone-600">{a.description}</p>
                  <ul className="mt-3 divide-y divide-orange-100">
                    {list.map((s) => (
                      <li
                        key={s.slug}
                        className="flex items-center gap-3 py-2 text-sm"
                      >
                        <span className="inline-flex rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700">
                          {s.kind === "elementary" ? "小" : "中"}
                        </span>
                        <span className="text-stone-800">{s.name}</span>
                        {s.note && (
                          <span className="ml-auto text-xs text-stone-500">
                            {s.note}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
        </div>
      )}
    </div>
  );
}
