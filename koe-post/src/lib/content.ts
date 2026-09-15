import type { Audience, Category, Grade, Status } from "./types";

export const app = {
  name: "こえポスト",
  tagline: "きみの「こえ」を、ひみつのポストに。",
  operator: "NPO法人ミライラボネクシア",
  publicSite: "https://mirailabo-nexia.skma.asia",
};

export const categories: { id: Category; label: string; sub: string; icon: string }[] = [
  { id: "home", label: "いえのこと", sub: "かぞく・おうち", icon: "house" },
  { id: "school", label: "がっこうのこと", sub: "じゅぎょう・せんせい・きょうしつ", icon: "school" },
  { id: "friends", label: "ともだちのこと", sub: "なかま・けんか・いじめ", icon: "users" },
  { id: "myself", label: "じぶんのこと", sub: "きもち・からだ・なやみ", icon: "heart" },
  { id: "wish", label: "してほしいこと", sub: "あったらいいな・やりたい", icon: "bulb" },
];

export const audiences: { id: Audience; label: string; sub: string }[] = [
  { id: "teacher", label: "がっこうのせんせい", sub: "きみのがっこうの先生にとどく" },
  { id: "npo", label: "NPOのおとな", sub: "がっこうとはべつの、そうだんのおとな" },
  { id: "any", label: "どちらでもいい", sub: "みてくれるおとなにおまかせ" },
];

export const grades: { id: Grade; label: string }[] = [
  { id: "low", label: "しょう1〜3" },
  { id: "mid", label: "しょう4〜6" },
  { id: "junior", label: "ちゅうがくせい" },
  { id: "high", label: "こうこうせい" },
  { id: "unknown", label: "いわない" },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  home: "家のこと",
  school: "学校のこと",
  friends: "友だちのこと",
  myself: "自分のこと",
  wish: "してほしいこと",
};
export const AUDIENCE_LABEL: Record<Audience, string> = {
  teacher: "学校の先生",
  npo: "NPOの大人",
  any: "どちらでも",
};
export const GRADE_LABEL: Record<Grade, string> = {
  low: "小1〜3",
  mid: "小4〜6",
  junior: "中学生",
  high: "高校生",
  unknown: "未回答",
};
export const STATUS_LABEL: Record<Status, string> = {
  new: "未確認",
  seen: "確認済",
  working: "対応中",
  done: "対応済",
};

// 送信後に必ず見せる相談窓口（24時間・無料）
export const helplines = [
  {
    name: "チャイルドライン",
    tel: "0120-99-7777",
    hours: "まいにち 16じ〜21じ（18さいまで）",
    note: "なまえをいわなくていい。チャットもある",
    url: "https://childline.or.jp/",
  },
  {
    name: "24時間子供SOSダイヤル",
    tel: "0120-0-78310",
    hours: "24じかん・まいにち",
    note: "いじめや学校のこまりごと（もんぶかがくしょう）",
    url: "https://www.mext.go.jp/a_menu/shotou/seitoshidou/06112210.htm",
  },
  {
    name: "こどもの人権110番",
    tel: "0120-007-110",
    hours: "へいじつ 8じ30ぷん〜17じ15ふん",
    note: "いじめ・ぎゃくたい（ほうむしょう）",
    url: "https://www.moj.go.jp/JINKEN/jinken112.html",
  },
];

export const emergency = "いますぐ あぶないときは、110（けいさつ）か 119（きゅうきゅう）に でんわしてね。";
