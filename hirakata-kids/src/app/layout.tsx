import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — 枚方市の子育て情報メディア`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — 枚方市の子育て情報メディア`,
    description: site.description,
    locale: site.locale,
    type: "website",
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgLd = organizationJsonLd();
  const siteLd = websiteJsonLd();
  return (
    <html lang="ja" className="antialiased">
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#F97316] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-md"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
      </body>
    </html>
  );
}
