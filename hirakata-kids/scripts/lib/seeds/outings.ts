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
  {
    id: "outings-day-kyoto",
    kind: "universal",
    category: "outings",
    subcategory: "events",
    baseTitle: "枚方市から京都方面へ 家族向け日帰りおでかけ",
    baseDescription:
      "枚方市から車・電車で行ける京都方面の家族向け日帰りおでかけプランをまとめました。",
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "outings-day-osaka",
    kind: "universal",
    category: "outings",
    subcategory: "events",
    baseTitle: "枚方市から大阪市内 家族で行きたい日帰りプラン",
    baseDescription:
      "枚方市から大阪市内へ家族で行く日帰りおでかけの交通手段とモデルコースをまとめました。",
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "outings-library",
    kind: "universal",
    category: "outings",
    subcategory: "indoor",
    baseTitle: "枚方市の図書館活用ガイド 子育て家庭向け",
    baseDescription:
      "枚方市立図書館の子ども向けサービス・貸出ルール・季節の読書イベントを、家族で活かす視点でまとめました。",
    themeTags: ["free", "rainy-day"],
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "guide",
  },
  {
    id: "outings-picnic-spots",
    kind: "universal",
    category: "outings",
    subcategory: "parks",
    baseTitle: "枚方市でピクニックにおすすめの場所",
    baseDescription:
      "枚方市内でレジャーシートを広げてピクニックを楽しめる芝生・広場・河川敷をまとめました。",
    themeTags: ["free", "weekend"],
    angle: "list",
  },
];
