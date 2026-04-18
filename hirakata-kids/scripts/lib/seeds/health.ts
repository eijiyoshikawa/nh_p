import type { TopicSeed } from "../topic-types";

export const healthSeeds: TopicSeed[] = [
  {
    id: "health-pediatrics-list",
    kind: "per-area",
    category: "health",
    subcategory: "pediatrics",
    baseTitle: "枚方市{area}の小児科クリニックまとめ",
    baseDescription:
      "枚方市{area}エリアの小児科クリニックを、予約方法・予防接種枠・診療時間の観点でまとめた保護者向けガイド。",
    ageTags: ["age-infant", "age-lower-elem"],
    themeTags: ["reservation"],
    sources: ["https://www.mfis.pref.osaka.jp/apqq/"],
    angle: "list",
  },
  {
    id: "health-dental-list",
    kind: "per-area",
    category: "health",
    subcategory: "dental",
    baseTitle: "枚方市{area}の小児歯科・キッズ対応歯科",
    baseDescription:
      "枚方市{area}エリアで小児・キッズ対応のある歯科クリニックを、予約方法・予防ケアの観点でまとめました。",
    ageTags: ["age-infant", "age-lower-elem", "age-upper-elem"],
    sources: ["https://www.mfis.pref.osaka.jp/apqq/"],
    angle: "list",
  },
  {
    id: "health-vaccine-schedule",
    kind: "universal",
    category: "health",
    subcategory: "vaccine",
    baseTitle: "枚方市の乳幼児予防接種スケジュールガイド",
    baseDescription:
      "枚方市の乳幼児定期予防接種のスケジュールと、接種間隔・持ち物・事前準備のポイントをまとめました。",
    ageTags: ["age-infant"],
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
  {
    id: "health-emergency-seasonal",
    kind: "monthly",
    category: "health",
    subcategory: "emergency",
    baseTitle: "{month}月の子どもの体調管理ポイント",
    baseDescription:
      "{month}月に注意したい子どもの体調変化と、発熱・感染症対応の基本、受診の目安をまとめました。",
    ageTags: ["age-infant", "age-lower-elem"],
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
  {
    id: "health-kids-mental",
    kind: "universal",
    category: "health",
    subcategory: "pediatrics",
    baseTitle: "子どものメンタルヘルス 枚方市で相談できる窓口",
    baseDescription:
      "子どもの不安・落ち込み・不登校などのメンタル面の相談窓口を、枚方市内で利用できる公的サービス中心に整理しました。",
    ageTags: ["age-lower-elem", "age-upper-elem", "age-jhs"],
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
];
