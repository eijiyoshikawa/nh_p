export type Feature = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  articleSlugs: string[];
};

export const features: Feature[] = [
  {
    slug: "nyugaku-junbi-2026",
    title: "入学準備 2026",
    description: "小学校・中学校の入学準備に役立つ情報をまとめた特集です。",
    intro:
      "2026年度に新入学を迎えるご家庭向けに、手続き・持ち物・生活リズム作り・支援制度の情報を集めました。前年秋から春休みまでを一本の流れで準備できます。",
    articleSlugs: [
      "hirakata-shogakko-nyugaku-junbi-2026",
    ],
  },
];

export function getFeature(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}
