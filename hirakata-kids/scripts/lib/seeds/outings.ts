import type { TopicSeed } from "../topic-types";

export const outingsSeeds: TopicSeed[] = [
  {
    id: "outings-parks-neighborhood",
    kind: "per-area",
    category: "outings",
    subcategory: "parks",
    baseTitle: "枚方市{area}の家族で行ける公園ガイド",
    baseDescription:
      "枚方市{area}エリアの公園を、遊具・広さ・駐車場・ベビーカー対応の観点でまとめた家族向けガイドです。",
    themeTags: ["free", "stroller-ok", "weekend"],
    ageTags: ["age-infant", "age-lower-elem"],
    angle: "list",
  },
  {
    id: "outings-parks-ball-play",
    kind: "per-area",
    category: "outings",
    subcategory: "parks",
    baseTitle: "枚方市{area}でボール遊びができる公園",
    baseDescription:
      "枚方市{area}エリアで小学生がボール遊び・キャッチボールできる広めの公園・広場をまとめました。",
    ageTags: ["age-lower-elem", "age-upper-elem"],
    themeTags: ["free", "weekend"],
    angle: "list",
  },
  {
    id: "outings-indoor-facilities",
    kind: "universal",
    category: "outings",
    subcategory: "indoor",
    baseTitle: "枚方市の屋内で遊べる施設まとめ",
    baseDescription:
      "枚方市内で雨の日でも安心して遊べる屋内施設を、未就学児・小学生別にまとめました。",
    themeTags: ["indoor-play", "rainy-day"],
    ageTags: ["age-infant", "age-lower-elem"],
    angle: "list",
  },
  {
    id: "outings-free-cheap",
    kind: "universal",
    category: "outings",
    subcategory: "free",
    baseTitle: "枚方市で無料または格安で楽しめるおでかけスポット",
    baseDescription:
      "枚方市と周辺の無料・格安で家族で楽しめるスポットを、交通手段と所要時間つきでまとめました。",
    themeTags: ["free", "weekend"],
    angle: "list",
  },
  {
    id: "outings-rainy-day-playlist",
    kind: "universal",
    category: "outings",
    subcategory: "rainy-day",
    baseTitle: "枚方市で雨の日に子どもと過ごせる場所",
    baseDescription:
      "雨の日でも枚方市内と周辺で家族で楽しめる屋内スポット、図書館、商業施設のイベントをまとめました。",
    themeTags: ["indoor-play", "rainy-day"],
    ageTags: ["age-infant", "age-lower-elem"],
    angle: "list",
  },
  {
    id: "outings-events-season",
    kind: "monthly",
    category: "outings",
    subcategory: "events",
    baseTitle: "枚方市の{month}月イベント・お出かけ情報",
    baseDescription:
      "枚方市とその周辺で{month}月に開催される子ども向けイベント・季節行事を季節感つきでまとめました。",
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "outings-parks-sakura",
    kind: "universal",
    category: "outings",
    subcategory: "parks",
    baseTitle: "枚方市の桜の名所 家族で楽しむお花見スポット",
    baseDescription:
      "枚方市内の桜の名所を、ベビーカー対応・トイレ・駐車場の観点でまとめ、家族向けお花見スポットとして整理しました。",
    months: [3, 4],
    themeTags: ["free", "stroller-ok", "weekend"],
    angle: "list",
  },
  {
    id: "outings-parks-kouyou",
    kind: "universal",
    category: "outings",
    subcategory: "parks",
    baseTitle: "枚方市周辺で紅葉を楽しめるスポット",
    baseDescription:
      "枚方市と周辺エリアで家族向けに紅葉を楽しめる公園や散歩ルートをまとめました。",
    months: [10, 11, 12],
    themeTags: ["free", "weekend"],
    angle: "list",
  },
];
