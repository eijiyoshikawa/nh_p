import { animalDistribution } from "@/lib/members";

// 動物占い（noa-group 結果ベース）の動物分布。
export function AnimalChart() {
  const dist = animalDistribution();
  const total = dist.reduce((a, b) => a + b.count, 0);

  return (
    <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold tracking-widest text-accent-orange">
        ANIMAL DISTRIBUTION
      </p>
      <h3 className="mt-1 text-lg font-bold text-text-primary">
        動物の分布
      </h3>
      <p className="mt-1 text-xs text-text-secondary">
        noa-group の動物占い診断結果ベース。{total} 名分のベース動物の内訳。
      </p>

      <ul className="mt-5 space-y-2">
        {dist.map((d) => (
          <li
            key={d.base}
            className="flex items-center gap-3 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2.5"
          >
            <span aria-hidden className="text-2xl">
              {d.emoji}
            </span>
            <div className="flex-1 text-sm">
              <p className="font-bold text-text-primary">
                {d.name}
                <span className="ml-2 text-xs font-normal text-text-secondary">
                  {d.count}名
                </span>
              </p>
              <p className="mt-0.5 text-xs text-text-secondary">
                {d.members.join("、")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
