import type { TopicSeed } from "../topic-types";

export const foodSeeds: TopicSeed[] = [
  {
    id: "food-lunch-family",
    kind: "per-area",
    category: "food",
    subcategory: "lunch",
    baseTitle: "枚方市{area}の子連れランチ",
    baseDescription:
      "枚方市{area}エリアで家族・子連れで利用しやすいランチの店を、座敷・個室・アレルギー対応の観点で比較できるようにまとめました。",
    ageTags: ["age-infant", "age-lower-elem"],
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "food-private-room",
    kind: "per-area",
    category: "food",
    subcategory: "private-room",
    baseTitle: "枚方市{area}の個室・座敷がある家族向けレストラン",
    baseDescription:
      "枚方市{area}エリアで個室や座敷を予約できる、家族で落ち着いて食事できるレストランをまとめました。",
    ageTags: ["age-infant", "age-lower-elem"],
    themeTags: ["reservation"],
    angle: "list",
  },
  {
    id: "food-takeout",
    kind: "per-area",
    category: "food",
    subcategory: "takeout",
    baseTitle: "枚方市{area}の家族向けテイクアウト",
    baseDescription:
      "枚方市{area}エリアで家族分まとめてテイクアウトできる店を、和洋中・ボリューム別にまとめました。",
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "food-cafe",
    kind: "per-area",
    category: "food",
    subcategory: "cafe",
    baseTitle: "枚方市{area}の子連れで入れるカフェ・スイーツ店",
    baseDescription:
      "枚方市{area}エリアの子連れで行きやすいカフェとスイーツ店を、ベビーカー対応と席の観点でまとめました。",
    ageTags: ["age-infant", "age-lower-elem"],
    themeTags: ["stroller-ok"],
    angle: "list",
  },
  {
    id: "food-allergy",
    kind: "universal",
    category: "food",
    subcategory: "lunch",
    baseTitle: "枚方市 食物アレルギー対応の飲食店ガイド",
    baseDescription:
      "枚方市内でアレルギー表示・対応を明確にしている飲食店やテイクアウトの選び方をまとめました。",
    themeTags: ["allergy-friendly"],
    angle: "guide",
  },
  {
    id: "food-seasonal-ingredient",
    kind: "monthly",
    category: "food",
    subcategory: "takeout",
    baseTitle: "{month}月の旬食材と家族で楽しむ献立ヒント",
    baseDescription:
      "{month}月に枚方市周辺で手に入る旬の食材と、家族で楽しめるシンプルな献立アイデアをまとめました。",
    angle: "guide",
  },
];
