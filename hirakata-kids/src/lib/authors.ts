export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  // Optional alternate display names that match this author (for backwards
  // compatibility with existing frontmatter using plain string authors).
  aliases?: string[];
};

export const authors: Author[] = [
  {
    slug: "hirakids-editorial",
    name: "HIRAKIDS編集部",
    role: "編集部",
    bio: "ひらかた子育てナビ（HIRAKIDS）の編集部です。枚方市内の子育て情報を、公式情報・独自取材・提携コンテンツをもとに発信しています。",
    aliases: ["HIRAKIDS編集部", "ひらかた子育てナビ編集部"],
  },
  {
    slug: "hirakids-medical-desk",
    name: "HIRAKIDS 医療・健康デスク",
    role: "医療・健康担当",
    bio: "小児科・夜間救急・予防接種・アレルギー対応など、子育て家庭が知っておきたい医療と健康の情報を、枚方市公式・大阪府医療機関情報システムをベースに整理しています。",
    aliases: ["HIRAKIDS医療・健康デスク", "HIRAKIDS医療デスク"],
  },
  {
    slug: "hirakids-edu-desk",
    name: "HIRAKIDS 教育・学校デスク",
    role: "教育・学校担当",
    bio: "保育・幼稚園・小中学校・塾・習い事・入学準備など、枚方市在住の子育て家庭向けの教育情報を、市公式発信をもとにまとめています。",
    aliases: ["HIRAKIDS教育・学校デスク", "HIRAKIDS教育デスク"],
  },
];

export function getAuthor(slugOrName: string): Author | undefined {
  return authors.find(
    (a) =>
      a.slug === slugOrName ||
      a.name === slugOrName ||
      (a.aliases ?? []).includes(slugOrName)
  );
}
