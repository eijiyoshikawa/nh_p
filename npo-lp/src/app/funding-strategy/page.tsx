import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "行政系資金調達戦略 — ひらかた子ども食堂支援NPO",
  description: "枚方市で活用可能な助成金・補助金の一覧と、2029年末までに1,000万円を達成するためのロードマップ。",
};

export default function FundingStrategyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-bold text-[#16A34A]">
            ← LPに戻る
          </Link>
          <span className="text-xs font-medium text-stone-500">内部資料</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium tracking-widest text-[#16A34A] uppercase">
            ②行政戦略
          </p>
          <h1 className="text-2xl font-extrabold leading-snug text-stone-900 sm:text-3xl md:text-4xl">
            行政系資金調達 骨組み
          </h1>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#16A34A]" />
        </div>

        {/* Overview Cards */}
        <div className="mb-12 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: "行政系目標", value: "1,000万円" },
            { label: "倉庫設立総額", value: "1,500万円" },
            { label: "運転資金", value: "月50万円" },
            { label: "達成期限", value: "2029年末" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white p-4 text-center shadow-sm"
            >
              <p className="text-xs text-stone-500">{item.label}</p>
              <p className="mt-1 text-xl font-bold text-stone-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tier 1 */}
        <Section title="Tier 1: 主力財源" subtitle="合計700〜1,200万円を狙う" accent="red">
          <GrantTable
            headers={["制度名", "想定額", "補助率", "申請時期", "窓口"]}
            rows={[
              ["★ WAM助成（通常助成・2〜3年）", "300〜700万円", "—", "毎年12月〜1月", "WAMに直接申請"],
              ["★ 大阪府福祉基金（民間団体提案型）", "100〜500万円", "要確認", "毎年1月", "大阪府福祉部"],
              ["★ 枚方市 地域空き家活用補助", "150〜250万円", "2/3", "通年（工事契約前）", "住宅まちづくり課"],
            ]}
          />
        </Section>

        {/* Tier 2 */}
        <Section title="Tier 2: 中核補完" subtitle="合計100〜500万円を狙う" accent="orange">
          <GrantTable
            headers={["制度名", "想定額", "補助率", "申請時期", "窓口"]}
            rows={[
              ["小規模事業者持続化補助金", "50〜250万円", "2/3", "年1〜2回", "枚方商工会議所"],
              ["こどもの未来応援基金", "150〜400万円", "—", "毎年8〜9月", "WAM NPOリソースセンター"],
              ["こども家庭庁 食事等支援事業", "〜50万円", "—", "毎年6〜7月", "むすびえ等経由"],
              ["大阪コミュニティ財団", "数十〜数百万円", "—", "毎年11月", "大阪コミュニティ財団"],
            ]}
          />
        </Section>

        {/* Tier 3 */}
        <Section title="Tier 3: 実績づくり" subtitle="年間30〜100万円" accent="green">
          <GrantTable
            headers={["制度名", "想定額", "申請時期", "窓口"]}
            rows={[
              ["枚方市NPO活動応援基金", "数十万円", "6〜7月（団体登録）", "市民活動課"],
              ["枚方市 子ども食堂補助金", "数十万円", "随時", "子ども青少年政策課"],
              ["枚方市社協 公募事業助成基金", "数十万円", "随時確認", "枚方市社会福祉協議会"],
              ["大阪府福祉基金（活動費助成）", "〜20万円", "毎年1月", "大阪府福祉部"],
              ["むすびえ・こども食堂基金", "数万〜数十万円", "春・秋", "むすびえ"],
              ["真如苑 こども食堂支援助成", "〜20万円", "毎年5月", "真如苑"],
            ]}
          />
        </Section>

        {/* Tier 4 */}
        <Section title="Tier 4: 大型チャレンジ枠" subtitle="採択されれば目標超過" accent="purple">
          <GrantTable
            headers={["制度名", "想定額", "申請時期", "備考"]}
            rows={[
              ["日本財団「子ども第三の居場所」", "最大6,500万円", "毎年10月", "補助率100%。週3〜5日開所が条件"],
              ["休眠預金活用事業", "数百〜数千万円", "資金分配団体経由", "むすびえ等が分配団体"],
              ["WAM助成（モデル事業）", "最大3,000万円/3年", "毎年1月頃", "先駆的取組が対象"],
            ]}
          />
        </Section>

        {/* Roadmap */}
        <h2 className="mb-8 mt-16 text-center text-xl font-bold text-stone-900 sm:text-2xl">
          年次ロードマップ（2026〜2029年）
        </h2>

        <div className="mb-16 space-y-6">
          <PhaseCard
            phase="1"
            title="実績構築期"
            period="2026年4月〜2027年3月"
            target="50〜150万円獲得 + 行政との関係構築"
            items={[
              "4月 枚方市子ども食堂補助金を申請 / 枚方商工会議所に相談開始",
              "5月 真如苑 こども食堂支援助成 申請",
              "6月 こども家庭庁 食事等支援事業 申請（むすびえ経由）",
              "7月 枚方市NPO活動応援基金 団体登録",
              "9月 こどもの未来応援基金 申請 / むすびえ秋募集 申請",
              "11月 大阪コミュニティ財団 申請",
              "1月 WAM助成（通常助成）申請 / 大阪府福祉基金 申請",
            ]}
            todos={[
              "子ども食堂への食材供給実績を月次で記録",
              "枚方市子ども青少年政策課・社協との定期面談",
              "倉庫候補物件のリストアップ開始",
            ]}
          />
          <PhaseCard
            phase="2"
            title="中核資金獲得期"
            period="2027年4月〜2028年3月"
            target="300〜700万円獲得 + 倉庫物件確定"
            items={[
              "5月 倉庫候補物件を住宅まちづくり課と相談",
              "8月 小規模事業者持続化補助金 申請（BSF事業 販路開拓）",
              "10月 日本財団「子ども第三の居場所」申請 ★大型チャレンジ",
              "1月 WAM助成（通常助成 or モデル事業）申請 ★主力",
              "1月 大阪府福祉基金（民間団体提案型）申請 ★主力",
              "3月 倉庫物件確定・改修計画策定",
            ]}
            todos={[
              "倉庫物件の選定（空き家活用補助の対象物件）",
              "枚方市への業務委託提案書の作成開始",
              "BSF飼育の試験運用開始（小規模パイロット）",
            ]}
          />
          <PhaseCard
            phase="3"
            title="倉庫設立期"
            period="2028年4月〜2029年3月"
            target="累計800〜1,000万円 + 倉庫改修着工"
            items={[
              "4月 枚方市 地域空き家活用補助 申請 ★工事契約前に必ず",
              "5月 倉庫改修工事開始",
              "8月 小規模事業者持続化補助金 申請（倉庫設備）",
              "10月 倉庫完成・運用開始",
              "1月 WAM助成 継続 or 新規申請 / 大阪府福祉基金 申請",
            ]}
            todos={[
              "倉庫改修工事の管理",
              "運用体制の構築（人員配置・物流フロー）",
            ]}
          />
          <PhaseCard
            phase="4"
            title="安定運用期"
            period="2029年4月〜12月"
            target="累計1,000万円達成 + 運転資金の安定化"
            items={[
              "4月 倉庫本格運用 / 枚方市への業務委託提案（フードバンク運営）",
              "12月 1,000万円達成確認",
            ]}
            todos={[
              "業務委託による継続収入の確保",
              "運用実績の整理・報告",
            ]}
          />
        </div>

        {/* Simulation */}
        <h2 className="mb-8 text-center text-xl font-bold text-stone-900 sm:text-2xl">
          1,000万円達成シミュレーション
        </h2>

        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-stone-500">
              保守的ケース（採択率25%）
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 text-left text-xs text-stone-500">
                  <th className="pb-2">年度</th>
                  <th className="pb-2">申請</th>
                  <th className="pb-2">採択</th>
                  <th className="pb-2">獲得額</th>
                  <th className="pb-2 text-right">累計</th>
                </tr>
              </thead>
              <tbody className="text-stone-700">
                <tr className="border-b border-stone-50">
                  <td className="py-2">2026</td><td>8件</td><td>2〜3件</td><td>50〜100万</td><td className="text-right">〜100万</td>
                </tr>
                <tr className="border-b border-stone-50">
                  <td className="py-2">2027</td><td>10件</td><td>3〜4件</td><td>200〜400万</td><td className="text-right">〜500万</td>
                </tr>
                <tr className="border-b border-stone-50">
                  <td className="py-2">2028</td><td>10件</td><td>3〜4件</td><td>300〜500万</td><td className="text-right">〜1,000万</td>
                </tr>
                <tr>
                  <td className="py-2">2029</td><td>8件</td><td>2〜3件</td><td>200〜300万</td><td className="text-right font-bold text-[#16A34A]">〜1,300万</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-stone-500">
              楽観的ケース（WAM+府福祉基金が早期採択）
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 text-left text-xs text-stone-500">
                  <th className="pb-2">年度</th>
                  <th className="pb-2">主な採択</th>
                  <th className="pb-2">獲得額</th>
                  <th className="pb-2 text-right">累計</th>
                </tr>
              </thead>
              <tbody className="text-stone-700">
                <tr className="border-b border-stone-50">
                  <td className="py-2">2026</td><td>小規模助成3件</td><td>100万</td><td className="text-right">100万</td>
                </tr>
                <tr className="border-b border-stone-50">
                  <td className="py-2">2027</td><td>WAM+府福祉基金</td><td>500万</td><td className="text-right">600万</td>
                </tr>
                <tr className="border-b border-stone-50">
                  <td className="py-2">2028</td><td>空き家補助+持続化</td><td>400万</td><td className="text-right font-bold text-[#22C55E]">1,000万</td>
                </tr>
                <tr>
                  <td className="py-2">2029</td><td>業務委託+継続</td><td>300万</td><td className="text-right font-bold text-[#22C55E]">1,300万</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mb-16 rounded-2xl bg-[#16A34A] p-6 text-center text-white sm:p-8">
          <p className="text-sm text-orange-200">結論</p>
          <p className="mt-2 text-lg font-bold leading-snug sm:text-xl">
            WAM助成（最大700万円）+ 空き家活用補助（最大250万円）の2本柱で950万円。
          </p>
          <p className="mt-2 text-sm text-orange-100">
            保守的に見ても2028〜2029年で1,000万円到達は現実的。
          </p>
        </div>

        {/* Calendar */}
        <h2 className="mb-8 text-center text-xl font-bold text-stone-900 sm:text-2xl">
          年間申請カレンダー
        </h2>

        <div className="mb-16 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {[
            { month: "1月", items: "WAM助成 / 府福祉基金", priority: "high" },
            { month: "4月", items: "持続化補助金", priority: "mid" },
            { month: "5月", items: "真如苑 / むすびえ春", priority: "low" },
            { month: "6月", items: "こども家庭庁", priority: "mid" },
            { month: "7月", items: "枚方市NPO基金", priority: "mid" },
            { month: "8月", items: "未来応援基金 準備", priority: "mid" },
            { month: "9月", items: "未来応援基金 締切", priority: "mid" },
            { month: "10月", items: "日本財団 / むすびえ秋", priority: "high" },
            { month: "11月", items: "大阪コミュニティ財団", priority: "mid" },
            { month: "12月", items: "WAM・府福祉基金 準備", priority: "high" },
            { month: "通年", items: "空き家活用補助", priority: "high" },
            { month: "通年", items: "子ども食堂補助金", priority: "mid" },
          ].map((item) => (
            <div
              key={item.month + item.items}
              className={`rounded-xl p-3 text-center ${
                item.priority === "high"
                  ? "bg-red-50 ring-1 ring-red-200"
                  : item.priority === "mid"
                    ? "bg-orange-50"
                    : "bg-stone-50"
              }`}
            >
              <p
                className={`text-xs font-bold ${
                  item.priority === "high" ? "text-red-600" : "text-stone-500"
                }`}
              >
                {item.month}
              </p>
              <p className="mt-1 text-xs leading-snug text-stone-700">
                {item.items}
              </p>
            </div>
          ))}
        </div>

        {/* Contacts */}
        <h2 className="mb-8 text-center text-xl font-bold text-stone-900 sm:text-2xl">
          枚方市の主要窓口
        </h2>

        <div className="mb-12 grid gap-3 sm:grid-cols-2">
          {[
            { dept: "子ども青少年政策課", tel: "072-841-1375", purpose: "子ども食堂補助金・業務委託" },
            { dept: "市民活動課", tel: "072-841-1221", purpose: "NPO応援基金" },
            { dept: "住宅まちづくり課", tel: "072-841-1478", purpose: "空き家活用補助" },
            { dept: "枚方市社会福祉協議会", tel: "072-807-3017", purpose: "公募事業助成・WAM相談" },
            { dept: "枚方商工会議所", tel: "—", purpose: "持続化補助金" },
            { dept: "農業振興課", tel: "072-841-1221", purpose: "BSF飼育・フラス（肥料）の農業連携" },
          ].map((item) => (
            <div key={item.dept} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm font-bold text-stone-900">{item.dept}</p>
              <p className="mt-1 text-xs text-stone-500">{item.purpose}</p>
              {item.tel !== "—" && (
                <p className="mt-2 text-sm font-medium text-[#16A34A]">
                  TEL: {item.tel}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-stone-400">
          本資料は2026年4月時点の調査に基づく。制度は年度ごとに変更される可能性があるため、申請前に必ず最新情報を確認すること。
        </p>
      </main>
    </div>
  );
}

/* --- Sub Components --- */

function Section({
  title,
  subtitle,
  accent,
  children,
}: {
  title: string;
  subtitle: string;
  accent: "red" | "orange" | "green" | "purple";
  children: React.ReactNode;
}) {
  const colors = {
    red: "border-red-200 bg-red-50 text-red-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    green: "border-green-200 bg-green-50 text-green-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
  };

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="text-lg font-bold text-stone-900">{title}</h2>
        <span
          className={`rounded-full border px-3 py-0.5 text-xs font-medium ${colors[accent]}`}
        >
          {subtitle}
        </span>
      </div>
      {children}
    </div>
  );
}

function GrantTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-100">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-medium text-stone-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-stone-50 last:border-none"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${
                    j === 0
                      ? "font-medium text-stone-900"
                      : "text-stone-600"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PhaseCard({
  phase,
  title,
  period,
  target,
  items,
  todos,
}: {
  phase: string;
  title: string;
  period: string;
  target: string;
  items: string[];
  todos: string[];
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-lg font-bold text-white">
          {phase}
        </div>
        <div>
          <h3 className="text-base font-bold text-stone-900">{title}</h3>
          <p className="text-xs text-stone-500">{period}</p>
        </div>
      </div>
      <p className="mb-4 rounded-lg bg-orange-50 px-3 py-2 text-sm font-medium text-[#15803D]">
        目標: {target}
      </p>
      <div className="mb-4 space-y-1.5">
        {items.map((item) => (
          <p key={item} className="text-sm leading-relaxed text-stone-700">
            <span className="mr-2 text-[#16A34A]">▸</span>
            {item}
          </p>
        ))}
      </div>
      <div className="border-t border-stone-100 pt-3">
        <p className="mb-2 text-xs font-bold text-stone-400 uppercase">この期間にやること</p>
        {todos.map((todo) => (
          <p key={todo} className="text-xs leading-relaxed text-stone-500">
            <span className="mr-2 text-[#22C55E]">✓</span>
            {todo}
          </p>
        ))}
      </div>
    </div>
  );
}
