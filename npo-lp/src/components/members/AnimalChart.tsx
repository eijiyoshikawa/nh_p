import { animalDistribution } from "@/lib/members";

// 動物占い（計算結果ベース）の動物分布。複数同種がいる場合は数を表示。
export function AnimalChart() {
  const dist = animalDistribution();
  const entries = Object.entries(dist).sort(
    (a, b) => b[1].count - a[1].count
  );
  const total = entries.reduce((a, [, v]) => a + v.count, 0);

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold tracking-widest text-accent-orange">
        ANIMAL DISTRIBUTION
      </p>
      <h3 className="mt-1 text-lg font-bold text-text-primary">
        動物分布（計算結果）
      </h3>
      <p className="mt-1 text-xs text-text-secondary">
        生年月日から算出した動物占いベースの分布。{total}名分。
      </p>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {entries.map(([key, v]) => (
          <li
            key={key}
            className="flex items-center gap-3 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2.5"
          >
            <span aria-hidden className="text-2xl">
              {v.emoji}
            </span>
            <div className="text-sm">
              <p className="font-bold text-text-primary">{v.name}</p>
              <p className="text-xs text-text-secondary">{v.count}名</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs text-text-secondary">
        ※ 個人の特性は <strong>自己申告の意思決定軸</strong> を優先しています。
        本計算は補助的な参考データとしてご活用ください。
      </p>
    </div>
  );
}
