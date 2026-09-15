import type { Metadata, Viewport } from "next";
import "./globals.css";
import { app } from "@/lib/content";

export const metadata: Metadata = {
  title: { default: `${app.name}｜${app.tagline}`, template: `%s｜${app.name}` },
  description:
    "子どもが、家や学校で困っていること・してほしいことを、名前を出さずに書ける秘密のポスト。書いた内容は子どもには見えず、信頼できる大人だけが読みます。",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
