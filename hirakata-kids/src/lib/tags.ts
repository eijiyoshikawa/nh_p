export const ageTagSlugs = [
  "age-infant",
  "age-lower-elem",
  "age-upper-elem",
  "age-jhs",
] as const;

export type AgeTagSlug = (typeof ageTagSlugs)[number];

export const themeTagSlugs = [
  "free",
  "reservation",
  "indoor-play",
  "stroller-ok",
  "allergy-friendly",
  "rainy-day",
  "weekend",
  "after-school",
] as const;

export type ThemeTagSlug = (typeof themeTagSlugs)[number];

export type Tag = {
  slug: string;
  label: string;
  kind: "age" | "theme";
};

export const ageTags: Tag[] = [
  { slug: "age-infant", label: "未就学児 (4-6歳)", kind: "age" },
  { slug: "age-lower-elem", label: "小学校低学年 (1-3年)", kind: "age" },
  { slug: "age-upper-elem", label: "小学校高学年 (4-6年)", kind: "age" },
  { slug: "age-jhs", label: "中学生", kind: "age" },
];

export const themeTags: Tag[] = [
  { slug: "free", label: "無料", kind: "theme" },
  { slug: "reservation", label: "予約必須", kind: "theme" },
  { slug: "indoor-play", label: "屋内で遊べる", kind: "theme" },
  { slug: "stroller-ok", label: "ベビーカーOK", kind: "theme" },
  { slug: "allergy-friendly", label: "アレルギー対応", kind: "theme" },
  { slug: "rainy-day", label: "雨の日OK", kind: "theme" },
  { slug: "weekend", label: "週末向け", kind: "theme" },
  { slug: "after-school", label: "放課後", kind: "theme" },
];

export const allTags: Tag[] = [...ageTags, ...themeTags];

export function getTag(slug: string): Tag | undefined {
  return allTags.find((t) => t.slug === slug);
}
