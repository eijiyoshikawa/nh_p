import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { org, siteUrl } from "@/lib/site";

const title = `${org.name}｜一緒に、ひらかたを育てませんか。`;
const description =
  "枚方の子ども食堂を応援するNPO法人（2026年秋設立予定）。子どもの居場所とあたたかいごはん、そして「ひらかたのこと、ひとこと聞かせてください」。市民の声を行政や地域につなぐハブを目指します。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s｜${org.shortName}`,
  },
  description,
  openGraph: {
    title,
    description,
    siteName: org.name,
    locale: "ja_JP",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#4E6B33",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: org.name,
  alternateName: org.en,
  url: siteUrl,
  email: org.email,
  areaServed: "大阪府枚方市",
  foundingDate: "2026",
  founder: { "@type": "Person", name: org.representative, jobTitle: org.representativeTitle },
  description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="antialiased">
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
