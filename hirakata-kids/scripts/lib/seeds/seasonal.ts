import type { TopicSeed } from "../topic-types";

// Seasonal seeds that flesh out the month-biased rotation. Each seed has
// explicit `months` so the planner tries to place them in-season first.
export const seasonalSeeds: TopicSeed[] = [
  {
    id: "seasonal-newyear-winter-play",
    kind: "universal",
    category: "outings",
    subcategory: "events",
    baseTitle: "枚方市の冬休み家族で楽しむ過ごし方",
    baseDescription:
      "冬休みを家族で楽しく過ごすための枚方市内の屋内外スポット・イベント・学習ペース作りをまとめました。",
    months: [12, 1],
    themeTags: ["indoor-play", "weekend"],
    ageTags: ["age-lower-elem", "age-upper-elem"],
    angle: "guide",
  },
  {
    id: "seasonal-spring-start",
    kind: "universal",
    category: "outings",
    subcategory: "events",
    baseTitle: "枚方市の春 家族で行きたい季節のおでかけ",
    baseDescription:
      "春の枚方市で家族で楽しめる桜・公園・イベント・春休みの過ごし方をまとめました。",
    months: [3, 4],
    themeTags: ["free", "stroller-ok", "weekend"],
    angle: "guide",
  },
  {
    id: "seasonal-golden-week",
    kind: "universal",
    category: "outings",
    subcategory: "events",
    baseTitle: "枚方市のゴールデンウィーク過ごし方",
    baseDescription:
      "ゴールデンウィークに枚方市と周辺で楽しめる家族向けイベント・混雑しないおでかけ先をまとめました。",
    months: [4, 5],
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "seasonal-plum-rainy",
    kind: "universal",
    category: "outings",
    subcategory: "rainy-day",
    baseTitle: "枚方市の梅雨を乗り切る屋内おでかけ",
    baseDescription:
      "梅雨時期に家族で楽しめる枚方市内・周辺の屋内施設と、雨の日の学習・読書・工作ヒントをまとめました。",
    months: [6, 7],
    themeTags: ["indoor-play", "rainy-day"],
    angle: "list",
  },
  {
    id: "seasonal-halloween-community",
    kind: "universal",
    category: "community",
    subcategory: "events",
    baseTitle: "枚方市のハロウィン親子イベント",
    baseDescription:
      "ハロウィン期間に枚方市と周辺で開催される親子イベントや、ご近所で楽しむアイデアをまとめました。",
    months: [10],
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "seasonal-christmas-community",
    kind: "universal",
    category: "community",
    subcategory: "events",
    baseTitle: "枚方市のクリスマスイベント・イルミネーション",
    baseDescription:
      "クリスマス期間の枚方市と近郊で楽しめる親子向けイベント・イルミネーションスポットをまとめました。",
    months: [11, 12],
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "seasonal-new-semester-prep",
    kind: "universal",
    category: "parenting",
    subcategory: "elementary",
    baseTitle: "新学期スタート 生活リズムを整える家族のルーチン",
    baseDescription:
      "長期休み明けの新学期に向けて、生活リズム・持ち物確認・学用品チェックを家族で進めるためのチェックリスト。",
    months: [3, 4, 8, 9, 12, 1],
    ageTags: ["age-lower-elem", "age-upper-elem", "age-jhs"],
    angle: "guide",
  },
  {
    id: "seasonal-summer-pool",
    kind: "universal",
    category: "outings",
    subcategory: "events",
    baseTitle: "枚方市と周辺の家族向けプール・水遊びスポット",
    baseDescription:
      "夏休みに家族で行ける枚方市内・近郊のプール、市民プール、水遊びスポットをまとめました。",
    months: [7, 8],
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "seasonal-fall-sports",
    kind: "universal",
    category: "outings",
    subcategory: "events",
    baseTitle: "枚方市の秋の運動会シーズンに備える",
    baseDescription:
      "秋の運動会シーズンに向けて、場所取り・応援グッズ・家族の過ごし方を整理しました。",
    months: [9, 10],
    themeTags: ["weekend"],
    ageTags: ["age-lower-elem", "age-upper-elem"],
    angle: "guide",
  },
];
