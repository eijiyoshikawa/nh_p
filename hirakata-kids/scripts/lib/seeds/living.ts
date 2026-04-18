import type { TopicSeed } from "../topic-types";

export const livingSeeds: TopicSeed[] = [
  {
    id: "living-disaster-hazard-map",
    kind: "per-area",
    category: "living",
    subcategory: "disaster",
    baseTitle: "枚方市{area}のハザードマップと避難ルート",
    baseDescription:
      "枚方市{area}エリアの洪水・土砂災害・地震ハザードマップを読み、自宅からの避難ルートを家族で決めるためのガイド。",
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
  {
    id: "living-safety-commute",
    kind: "per-area",
    category: "living",
    subcategory: "safety",
    baseTitle: "枚方市{area}の通学路 防犯・交通安全チェック",
    baseDescription:
      "枚方市{area}エリアの小学校通学路で気をつけたい交差点・ブロック塀・不審者情報の共有方法をまとめました。",
    ageTags: ["age-lower-elem", "age-upper-elem"],
    sources: ["https://www.police.pref.osaka.lg.jp/"],
    angle: "guide",
  },
  {
    id: "living-shopping-supermarket",
    kind: "per-area",
    category: "living",
    subcategory: "shopping",
    baseTitle: "枚方市{area}のスーパー・日用品買い物ガイド",
    baseDescription:
      "枚方市{area}エリアで日常の買い物に使えるスーパー・ドラッグストアを、営業時間・駐車場・駅からの距離でまとめました。",
    themeTags: ["stroller-ok"],
    angle: "list",
  },
  {
    id: "living-housing-overview",
    kind: "per-area",
    category: "living",
    subcategory: "housing",
    baseTitle: "枚方市{area}の住環境と子育て家庭の目線",
    baseDescription:
      "枚方市{area}エリアの住環境を、通学・通勤・買い物・医療のアクセス観点で子育て家庭の目線でまとめました。",
    angle: "column",
  },
  {
    id: "living-disaster-stock",
    kind: "universal",
    category: "living",
    subcategory: "disaster",
    baseTitle: "子育て家庭の防災備蓄 枚方市でそろえる最低限リスト",
    baseDescription:
      "子育て家庭向けの防災備蓄を、飲料水・食料・衛生用品・子ども向けアイテムの4軸で最低限のリストにまとめました。",
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
  {
    id: "living-safety-sns",
    kind: "universal",
    category: "living",
    subcategory: "safety",
    baseTitle: "子どものスマホ・SNS利用ルール 家庭で決めたい基準",
    baseDescription:
      "枚方市の保護者向けに、子どものスマホ・SNS利用の家庭内ルールを年齢別に整理しました。",
    ageTags: ["age-upper-elem", "age-jhs"],
    angle: "guide",
  },
  {
    id: "living-disaster-familytalk",
    kind: "universal",
    category: "living",
    subcategory: "disaster",
    baseTitle: "年1回の家族防災会議 枚方市の家庭で話したいこと",
    baseDescription:
      "年1回は家族で災害時の連絡方法・合流ポイント・備蓄状況を確認する防災会議の進め方をまとめました。",
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
  {
    id: "living-disaster-tomadoi",
    kind: "universal",
    category: "living",
    subcategory: "disaster",
    baseTitle: "在宅避難の進め方 枚方市の集合住宅・戸建て",
    baseDescription:
      "被災時に自宅が安全なら検討したい在宅避難の判断基準と、集合住宅・戸建てそれぞれの備え方をまとめました。",
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
  {
    id: "living-safety-bike",
    kind: "universal",
    category: "living",
    subcategory: "safety",
    baseTitle: "枚方市の子ども自転車ルール・ヘルメット着用",
    baseDescription:
      "枚方市在住の小中学生向けに、自転車のルール・ヘルメット着用・保険加入の基本をまとめました。",
    ageTags: ["age-lower-elem", "age-upper-elem", "age-jhs"],
    sources: ["https://www.police.pref.osaka.lg.jp/"],
    angle: "guide",
  },
  {
    id: "living-shopping-babygoods",
    kind: "universal",
    category: "living",
    subcategory: "shopping",
    baseTitle: "枚方市のベビー・子ども用品が買える店まとめ",
    baseDescription:
      "枚方市内でベビー用品・子ども服・知育玩具が揃う店舗と、リユース・フリマ活用のヒントをまとめました。",
    ageTags: ["age-infant"],
    angle: "list",
  },
];
