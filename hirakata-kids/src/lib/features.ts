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
      "hirakata-chugakko-nyugaku-junbi-2026",
    ],
  },
  {
    slug: "bousai-kihon",
    title: "子育て家庭の防災基本",
    description:
      "ハザードマップの読み方から備蓄・避難行動まで、子どものいる家庭向けに必要最低限を整理した特集。",
    intro:
      "地震・風水害・土砂災害への備えを、子育て家庭目線でまとめた特集です。家族防災会議の進め方、子ども向け備蓄品、学校・園の引き渡しルールまでを一気通貫で押さえます。",
    articleSlugs: [
      "hirakata-bousai-kihon",
    ],
  },
];

export function getFeature(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}
