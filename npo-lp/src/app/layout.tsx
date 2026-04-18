import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "支援を受ける場所から、価値を生み出す拠点へ — NPO法人ミライラボネクシア",
  description:
    "NPO法人ミライラボネクシアは、枚方市の子ども食堂をプラットフォームに、地域と経済を繋ぎ直す循環型NPO。セントラル倉庫・ひらかた通貨など複数事業で持続可能な地域インフラを整備。",
  openGraph: {
    title: "支援を受ける場所から、価値を生み出す拠点へ — NPO法人ミライラボネクシア",
    description:
      "子ども食堂をプラットフォームに、地域と経済を繋ぎ直す。セントラル倉庫・ひらかた通貨など複数事業で枚方から全国へ。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
