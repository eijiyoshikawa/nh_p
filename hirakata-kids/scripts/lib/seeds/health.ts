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
  {
    id: "health-emergency-nighttime",
    kind: "universal",
    category: "health",
    subcategory: "emergency",
    baseTitle: "枚方市の夜間・休日救急の使い分けガイド",
    baseDescription:
      "子どもが夜間・休日に急病になったとき、#8000・119・夜間救急・休日診療所をどう使い分けるかを整理しました。",
    ageTags: ["age-infant", "age-lower-elem", "age-upper-elem"],
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
  {
    id: "health-kakaritsuke-choose",
    kind: "universal",
    category: "health",
    subcategory: "pediatrics",
    baseTitle: "かかりつけ医の選び方 枚方市の家庭向け",
    baseDescription:
      "枚方市でかかりつけ小児科を決めるときの基準、複数クリニックを比較するための観点、切り替えのコツをまとめました。",
    ageTags: ["age-infant", "age-lower-elem"],
    angle: "guide",
  },
  {
    id: "health-allergy-family",
    kind: "universal",
    category: "health",
    subcategory: "pediatrics",
    baseTitle: "食物アレルギーと家族の食卓 枚方市で使える支援",
    baseDescription:
      "食物アレルギーがある子どもと暮らす家庭向けに、枚方市内で利用できる医療窓口・学校給食対応・外食のヒントをまとめました。",
    themeTags: ["allergy-friendly"],
    ageTags: ["age-infant", "age-lower-elem"],
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
  {
    id: "health-checkup-school",
    kind: "universal",
    category: "health",
    subcategory: "vaccine",
    baseTitle: "枚方市の乳幼児健診・就学時健診ガイド",
    baseDescription:
      "枚方市の乳幼児健診と就学時健康診断の対象年齢・案内時期・当日の持ち物を時系列でまとめました。",
    ageTags: ["age-infant"],
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
];
