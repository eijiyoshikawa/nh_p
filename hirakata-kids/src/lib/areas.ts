export const areaSlugs = [
  "kuzuha",
  "makino",
  "hirakatashi",
  "korien",
  "nagao",
  "tsuda",
  "fujisaka",
  "yamadaike",
] as const;

export type AreaSlug = (typeof areaSlugs)[number];

export type Area = {
  slug: AreaSlug;
  label: string;
  description: string;
};

export const areas: Area[] = [
  { slug: "kuzuha", label: "樟葉", description: "京阪樟葉駅周辺。くずはモール・大型商業施設エリア。" },
  { slug: "makino", label: "牧野", description: "京阪牧野駅周辺。住宅地として人気のエリア。" },
  { slug: "hirakatashi", label: "枚方市駅周辺", description: "枚方市の中心市街地。市役所・T-SITE周辺。" },
  { slug: "korien", label: "香里園", description: "市南部、香里園駅周辺エリア。" },
  { slug: "nagao", label: "長尾", description: "JR学研都市線沿線、長尾駅周辺。" },
  { slug: "tsuda", label: "津田", description: "JR津田駅周辺、東部エリア。" },
  { slug: "fujisaka", label: "藤阪", description: "JR藤阪駅周辺、東部住宅地。" },
  { slug: "yamadaike", label: "山田池", description: "山田池公園を中心とした自然豊かなエリア。" },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function isAreaSlug(slug: string): slug is AreaSlug {
  return (areaSlugs as readonly string[]).includes(slug);
}
