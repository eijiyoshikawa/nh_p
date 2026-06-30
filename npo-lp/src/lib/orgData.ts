// メンバー専用ダッシュボード・資料ページのデータ。
// ※ここは運営状況に応じて手動で更新してください（編集→git push→deploy）。

// ===== 資金調達の進捗 =====
export const fundingGoal = {
  // 最終目標額（円）
  target: 10_000_000,
  // 現在までの累計調達額（円）。実績に応じて更新。
  raised: 0,
  // 年次マイルストーン
  milestones: [
    { year: "2026", label: "実績づくり", target: 1_500_000, raised: 0 },
    { year: "2027", label: "中核資金獲得（前半）", target: 3_000_000, raised: 0 },
    { year: "2028", label: "中核資金獲得（後半）", target: 8_000_000, raised: 0 },
    { year: "2029", label: "倉庫設立・1,000万円達成", target: 10_000_000, raised: 0 },
  ],
};

// ===== 助成金・補助金の申請ステータス =====
export type GrantStatus = "検討中" | "準備中" | "申請済み" | "採択" | "不採択";

export const grantApplications: Array<{
  name: string;
  amount: string;
  status: GrantStatus;
  deadline?: string; // 申請期限・結果予定など
  note?: string;
}> = [
  {
    name: "WAM助成金（福祉医療機構）",
    amount: "最大700万円",
    status: "検討中",
    note: "子ども食堂・フードバンク支援事業。実績を積んでから申請予定。",
  },
  {
    name: "枚方市 地域空き家活用補助",
    amount: "最大250万円",
    status: "検討中",
    note: "空き家改修工事費（補助率2/3）。物件確定後に申請。",
  },
  {
    name: "大阪府福祉基金（民間団体提案型）",
    amount: "100〜500万円",
    status: "検討中",
    note: "社会福祉振興事業。",
  },
  {
    name: "小規模事業者持続化補助金",
    amount: "最大250万円",
    status: "検討中",
    note: "設備導入・販路開拓（補助率2/3）。きくらげ事業で活用検討。",
  },
];

// ===== 資料・議事録のリンク =====
// Google Drive / Docs / Notion などの共有リンクをここに追加。
export type DocCategory = "議事録" | "資料" | "申請書類" | "その他";

export const documents: Array<{
  title: string;
  category: DocCategory;
  url?: string; // 未設定なら「準備中」表示
  date?: string;
  note?: string;
}> = [
  {
    title: "設立準備ミーティング 議事録",
    category: "議事録",
    date: "",
    note: "リンクは運営担当が追加します（準備中）",
  },
  {
    title: "事業計画書（ドラフト）",
    category: "資料",
    note: "準備中",
  },
  {
    title: "助成金申請テンプレート集",
    category: "申請書類",
    note: "準備中",
  },
];

export function yen(n: number): string {
  return `¥${n.toLocaleString("ja-JP")}`;
}
