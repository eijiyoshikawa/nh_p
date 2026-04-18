import type { TopicSeed } from "../topic-types";

export const communitySeeds: TopicSeed[] = [
  {
    id: "community-volunteer-kids",
    kind: "universal",
    category: "community",
    subcategory: "volunteer",
    baseTitle: "枚方市で家族で参加できるボランティア活動",
    baseDescription:
      "枚方市内で小学生以上の子どもと保護者が一緒に参加できる、地域清掃・子ども食堂・福祉系のボランティア活動を整理しました。",
    ageTags: ["age-lower-elem", "age-upper-elem", "age-jhs"],
    themeTags: ["weekend"],
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "list",
  },
  {
    id: "community-events-local",
    kind: "per-area",
    category: "community",
    subcategory: "events",
    baseTitle: "枚方市{area}の地域イベントカレンダー",
    baseDescription:
      "枚方市{area}エリアで開催される夏祭り・地域交流会・子ども向けイベントの年間カレンダーをまとめました。",
    themeTags: ["weekend"],
    angle: "list",
  },
  {
    id: "community-pta-intro",
    kind: "universal",
    category: "community",
    subcategory: "pta",
    baseTitle: "枚方市の小学校PTA入門 役員・委員の役割と関わり方",
    baseDescription:
      "枚方市の公立小学校のPTAに関わる前に知っておきたい役員・委員の役割と、働きながら参加するコツをまとめました。",
    ageTags: ["age-lower-elem", "age-upper-elem"],
    angle: "guide",
  },
  {
    id: "community-kodomoshokudo",
    kind: "universal",
    category: "community",
    subcategory: "volunteer",
    baseTitle: "枚方市の子ども食堂と地域食の取り組み",
    baseDescription:
      "枚方市内で運営されている子ども食堂と、地域の食を通じた子育て支援の取り組みをまとめました。",
    sources: ["https://www.city.hirakata.osaka.jp/"],
    angle: "column",
  },
  {
    id: "community-seasonal-matsuri",
    kind: "monthly",
    category: "community",
    subcategory: "events",
    baseTitle: "{month}月の枚方市 地域行事・お祭り情報",
    baseDescription:
      "{month}月に枚方市内と周辺で開催される地域行事・お祭り・季節イベントを、家族で参加する目線でまとめました。",
    themeTags: ["weekend"],
    angle: "list",
  },
];
