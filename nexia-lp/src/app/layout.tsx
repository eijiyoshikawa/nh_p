import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { org, siteUrl } from "@/lib/site";

const title = `${org.name}｜子ども食堂を、枚方のブランドに。`;
const description =
  "枚方市内の子ども食堂を支援するNPO法人（2026年秋設立予定）。子どもが行きたい、親が行かせたい、企業や飲食店も関わりたい「新しい子ども食堂」のかたちを、既存の食堂・団体・行政と一緒につくります。";

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
  themeColor: "#2457C5",
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
