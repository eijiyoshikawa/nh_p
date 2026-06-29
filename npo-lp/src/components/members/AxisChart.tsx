import { axisDistribution } from "@/lib/members";

// 動物占いの3軸（心理・行動・思考）の組織傾向。
export function AxisChart() {
  const dist = axisDistribution();

  type Row = { label: string; left: string; right: string; leftN: number; rightN: number };
  const rows: Row[] = [
    {
      label: "心理ベクトル",
      left: "未来展望型",
      right: "過去回想型",
      leftN: dist.characterVector["未来展望型"],
      rightN: dist.characterVector["過去回想型"],
    },
    {
      label: "行動パターン",
      left: "目標指向型",
      right: "状況対応型",
      leftN: dist.behaviorPattern["目標指向型"],
      rightN: dist.behaviorPattern["状況対応型"],
    },
    {
      label: "思考パターン",
      left: "左脳型",
      right: "右脳型",
      leftN: dist.thinkingPattern["左脳型"],
      rightN: dist.thinkingPattern["右脳型"],
    },
  ];

  return (
    <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold tracking-widest text-accent-orange">
        BEHAVIOR / THINKING AXES
      </p>
      <h3 className="mt-1 text-lg font-bold text-text-primary">
        3軸の組織傾向
      </h3>
      <p className="mt-1 text-xs text-text-secondary">
        動物占いの心理・行動・思考の3軸での組織内の分布。意思決定スタイルの偏りが見えます。
      </p>

      <div className="mt-5 space-y-5">
        {rows.map((r) => {
          const total = r.leftN + r.rightN;
          const leftPct = total > 0 ? Math.round((r.leftN / total) * 100) : 0;
          const rightPct = 100 - leftPct;
          return (
            <div key={r.label}>
              <p className="text-xs font-semibold text-text-primary">
                {r.label}
              </p>
              <div className="mt-2 flex items-stretch overflow-hidden rounded-lg border border-stone-200">
                <div
                  className="flex items-center justify-start bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-800 transition-all"
                  style={{ width: `${leftPct}%`, minWidth: leftPct > 0 ? "4rem" : 0 }}
                >
                  {r.left} {r.leftN}
                </div>
                <div
                  className="flex items-center justify-end bg-amber-100 px-3 py-2 text-xs font-bold text-amber-800 transition-all"
                  style={{ width: `${rightPct}%`, minWidth: rightPct > 0 ? "4rem" : 0 }}
                >
                  {r.rightN} {r.right}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
