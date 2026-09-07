export type NewsItem = {
  slug: string;
  date: string; // YYYY-MM-DD
  category: "お知らせ" | "活動報告" | "募集" | "メディア";
  title: string;
  summary: string;
  body: string[]; // 段落ごと
};

export const news: NewsItem[] = [
  {
    slug: "2026-09-website-open",
    date: "2026-09-07",
    category: "お知らせ",
    title: "公式サイトを公開しました",
    summary: "NPO法人ミライラボネクシア（2026年秋設立予定）の公式サイトを公開しました。",
    body: [
      "枚方市内の子ども食堂支援を行うNPO法人ミライラボネクシア（設立準備中）の公式サイトを公開しました。",
      "私たちが目指す「新しい子ども食堂」のかたち、活動内容、関わり方をまとめています。ご意見・ご質問はお問い合わせフォームまたはLINE公式アカウントからお寄せください。",
    ],
  },
  {
    slug: "2026-09-partner-recruit",
    date: "2026-09-07",
    category: "募集",
    title: "パートナー食堂・協力企業・飲食店の募集を開始します",
    summary: "既存の子ども食堂、これから始めたい飲食店・企業の皆さまとの連携を募集します。",
    body: [
      "法人設立に先立ち、パートナーとなっていただける子ども食堂、協力企業、飲食店の募集を開始します。",
      "「話だけ聞きたい」という段階でも歓迎です。お問い合わせフォームから該当する区分を選んでご連絡ください。設立準備室よりご連絡します。",
    ],
  },
  {
    slug: "2026-08-concept",
    date: "2026-08-20",
    category: "活動報告",
    title: "コンセプト「子ども食堂を、枚方のブランドに。」を策定しました",
    summary: "メンバーでの議論を経て、団体のコンセプトと3つの活動の柱を決定しました。",
    body: [
      "設立準備メンバーでの議論を重ね、団体のコンセプトを「子ども食堂を、枚方のブランドに。」と定めました。",
      "既存の子ども食堂・団体を支えること、新しい食堂を増やすこと、共通のブランドをつくること。この3つを活動の柱に、2026年秋の法人設立を目指します。",
    ],
  },
];

export const sortedNews = [...news].sort((a, b) => (a.date < b.date ? 1 : -1));

export function findNews(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}
