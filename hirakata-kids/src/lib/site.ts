export const site = {
  name: "ひらかた子育てナビ",
  shortName: "HIRAKIDS",
  description:
    "枚方市在住の子育て世代（お子様4〜15歳）向けの地域情報メディア。学校・習い事・おでかけ・医療・防災まで、一次情報ベースで発信します。",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://hirakata-kids.example.jp",
  locale: "ja_JP",
  operator: {
    name: "三慧経営顧問株式会社",
    url: "https://skma.asia/",
  },
} as const;
