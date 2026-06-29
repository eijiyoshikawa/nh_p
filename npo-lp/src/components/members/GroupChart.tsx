import { GROUP_LABELS, groupDistribution } from "@/lib/members";
import type { AnimalGroup } from "@/lib/animalFortune";

// 棒グラフ＋数値で MOON / EARTH / SUN の分布を可視化する。
export function GroupChart() {
  const dist = groupDistribution();
  const total = (Object.values(dist) as number[]).reduce((a, b) => a + b, 0);
  const groups: AnimalGroup[] = ["MOON", "EARTH", "SUN"];

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold tracking-widest text-accent-orange">
        ORGANIZATION TENDENCY
      </p>
      <h3 className="mt-1 text-lg font-bold text-text-primary">
        意思決定軸の分布（自己申告）
      </h3>
      <p className="mt-1 text-xs text-text-secondary">
        メンバー {total} 名の自己診断結果。バランスが視覚的にわかります。
      </p>

      <div className="mt-5 space-y-4">
        {groups.map((g) => {
          const n = dist[g];
          const pct = total > 0 ? Math.round((n / total) * 100) : 0;
          const info = GROUP_LABELS[g];
          return (
            <div key={g}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-bold text-text-primary">
                  {info.label}
                  <span className="ml-2 text-xs font-normal text-text-secondary">
                    {info.sub}
                  </span>
                </span>
                <span className="font-mono text-text-secondary">
                  {n}名 ({pct}%)
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-stone-100">
                <div
                  className={
                    g === "MOON"
                      ? "h-full bg-indigo-400"
                      : g === "EARTH"
                      ? "h-full bg-emerald-400"
                      : "h-full bg-amber-400"
                  }
                  style={{ width: `${pct}%` }}
                  aria-hidden
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-text-secondary">
        現状は <strong>MOON 軸が中心</strong> の組織です。協調性・共感の強みを活かしながら、
        意思決定の場面では EARTH / SUN 軸のメンバーが補完する形が想定されます。
      </p>
    </div>
  );
}
