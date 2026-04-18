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
];

export function getAuthor(slugOrName: string): Author | undefined {
  return authors.find(
    (a) =>
      a.slug === slugOrName ||
      a.name === slugOrName ||
      (a.aliases ?? []).includes(slugOrName)
  );
}
