export type Feature = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  articleSlugs: string[];
};

export const features: Feature[] = [
  {
    slug: "natsuyasumi-2026",
    title: "夏休み 2026",
    description: "枚方市の子育て家庭の夏休みを、遊び・学習・預け先の3本柱で乗り切る特集。",
    intro:
      "40日間の夏休みを4週間テーマ制で計画し、無料公園での外遊び、図書館や屋内施設の活用、共働き家庭の預け先確保までを一気通貫で整理した特集です。",
    articleSlugs: [
      "hirakata-natsuyasumi-2026",
      "hirakata-muryo-koen-10sen",
    ],
  },
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
      "地震・風水害・土砂災害への備えを、子育て家庭目線でまとめた特集です。家族防災会議の進め方、子ども向け備蓄品、学校・園の引き渡しルール、避難所の使い分け、通学中の初動対応までを一気通貫で押さえます。",
    articleSlugs: [
      "hirakata-bousai-kihon",
      "hirakata-hazard-map-kids",
      "hirakata-hinansho-list",
      "hirakata-randsel-hinan",
    ],
  },
];

export function getFeature(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}
