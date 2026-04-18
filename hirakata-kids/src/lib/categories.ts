export const categorySlugs = [
  "parenting",
  "outings",
  "food",
  "health",
  "living",
  "community",
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export type Category = {
  slug: CategorySlug;
  label: string;
  description: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  slug: string;
  label: string;
  parent: CategorySlug;
};

export type SubcategorySlug = string;

export const categories: Category[] = [
  {
    slug: "parenting",
    label: "子育て・教育",
    description: "保育園・学校・塾・習い事・子育て支援制度など、枚方市の教育環境をまとめて解説。",
    subcategories: [
      { slug: "preschool", label: "保育・幼稚園・こども園", parent: "parenting" },
      { slug: "elementary", label: "小学校", parent: "parenting" },
      { slug: "junior-high", label: "中学校", parent: "parenting" },
      { slug: "lessons", label: "塾・習い事", parent: "parenting" },
      { slug: "exam", label: "受験・進学", parent: "parenting" },
      { slug: "support", label: "子育て支援制度", parent: "parenting" },
    ],
  },
  {
    slug: "outings",
    label: "おでかけ・遊び場",
    description: "公園・屋内施設・季節イベントなど、家族で楽しめる枚方市内のスポット情報。",
    subcategories: [
      { slug: "parks", label: "公園・広場", parent: "outings" },
      { slug: "indoor", label: "屋内施設", parent: "outings" },
      { slug: "events", label: "季節イベント", parent: "outings" },
      { slug: "free", label: "無料スポット", parent: "outings" },
      { slug: "rainy-day", label: "雨の日", parent: "outings" },
    ],
  },
  {
    slug: "food",
    label: "グルメ",
    description: "子連れランチ・個室あり・テイクアウトなど、枚方市のファミリー向け飲食店情報。",
    subcategories: [
      { slug: "lunch", label: "子連れランチ", parent: "food" },
      { slug: "private-room", label: "個室・座敷", parent: "food" },
      { slug: "takeout", label: "テイクアウト", parent: "food" },
      { slug: "cafe", label: "カフェ・スイーツ", parent: "food" },
    ],
  },
  {
    slug: "health",
    label: "医療・健康",
    description: "小児科・歯科・夜間救急・予防接種など、枚方市の子どもの医療情報。",
    subcategories: [
      { slug: "pediatrics", label: "小児科", parent: "health" },
      { slug: "dental", label: "歯科", parent: "health" },
      { slug: "emergency", label: "夜間・休日救急", parent: "health" },
      { slug: "vaccine", label: "予防接種・健診", parent: "health" },
    ],
  },
  {
    slug: "living",
    label: "暮らし・防災",
    description: "防災・防犯・買い物・住環境など、枚方市で子育てする毎日に役立つ情報。",
    subcategories: [
      { slug: "disaster", label: "防災・ハザードマップ", parent: "living" },
      { slug: "safety", label: "防犯・通学路", parent: "living" },
      { slug: "shopping", label: "買い物・スーパー", parent: "living" },
      { slug: "housing", label: "住環境", parent: "living" },
    ],
  },
  {
    slug: "community",
    label: "コミュニティ",
    description: "NPO・ボランティア・地域イベント・PTAなど、枚方市の人のつながり情報。",
    subcategories: [
      { slug: "volunteer", label: "NPO・ボランティア", parent: "community" },
      { slug: "events", label: "地域イベント", parent: "community" },
      { slug: "pta", label: "PTA・保護者会", parent: "community" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return (categorySlugs as readonly string[]).includes(slug);
}
