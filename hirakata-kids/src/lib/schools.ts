import type { AreaSlug } from "./areas";

export type SchoolKind = "elementary" | "junior-high";

export type School = {
  slug: string;
  name: string;
  kind: SchoolKind;
  area: AreaSlug;
  address?: string;
  note?: string;
};

// NOTE: Representative set of Hirakata City public schools for the MVP tool.
// Area tagging is a coarse grouping for UI filtering and does not imply the
// official 校区 boundary — always confirm the assigned school on Hirakata City
// 通学区域表 before making a decision.
export const schools: School[] = [
  // 小学校（Representative selection）
  { slug: "hirakata-sho", name: "枚方小学校", kind: "elementary", area: "hirakatashi" },
  { slug: "sabaigawa-sho", name: "磯島小学校", kind: "elementary", area: "hirakatashi" },
  { slug: "makino-sho", name: "牧野小学校", kind: "elementary", area: "makino" },
  { slug: "sakurakaoka-sho", name: "桜丘小学校", kind: "elementary", area: "makino" },
  { slug: "kuzuha-sho", name: "樟葉小学校", kind: "elementary", area: "kuzuha" },
  { slug: "kuzuha-minami-sho", name: "樟葉南小学校", kind: "elementary", area: "kuzuha" },
  { slug: "korigaoka-sho", name: "香里小学校", kind: "elementary", area: "korien" },
  { slug: "kaori-sho", name: "香陽小学校", kind: "elementary", area: "korien" },
  { slug: "nagao-sho", name: "長尾小学校", kind: "elementary", area: "nagao" },
  { slug: "nagao-nishi-sho", name: "長尾西小学校", kind: "elementary", area: "nagao" },
  { slug: "tsuda-sho", name: "津田小学校", kind: "elementary", area: "tsuda" },
  { slug: "tsuda-minami-sho", name: "津田南小学校", kind: "elementary", area: "tsuda" },
  { slug: "fujisaka-sho", name: "藤阪小学校", kind: "elementary", area: "fujisaka" },
  { slug: "yamada-sho", name: "山田小学校", kind: "elementary", area: "yamadaike" },

  // 中学校（Representative selection）
  { slug: "hirakata-chu", name: "枚方中学校", kind: "junior-high", area: "hirakatashi" },
  { slug: "makino-chu", name: "牧野中学校", kind: "junior-high", area: "makino" },
  { slug: "kuzuha-chu", name: "楠葉中学校", kind: "junior-high", area: "kuzuha" },
  { slug: "korigaoka-chu", name: "香陽中学校", kind: "junior-high", area: "korien" },
  { slug: "nagao-chu", name: "長尾中学校", kind: "junior-high", area: "nagao" },
  { slug: "tsuda-chu", name: "津田中学校", kind: "junior-high", area: "tsuda" },
  { slug: "fujisaka-chu", name: "招提中学校", kind: "junior-high", area: "fujisaka" },
  { slug: "yamada-chu", name: "山田中学校", kind: "junior-high", area: "yamadaike" },
];
