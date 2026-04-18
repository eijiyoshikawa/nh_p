// Curated list of public, copyright-safe data sources for article generation.
// Only list URLs that are: (a) official public sources, (b) explicitly quotable
// under fair use / open data licenses, or (c) sources we hold written permission
// for. No scraping of commercial media sites.

export type SourceEntry = {
  title: string;
  url: string;
  license: "public-domain" | "cc-by" | "official" | "partnered";
  note?: string;
};

export const officialSources: SourceEntry[] = [
  {
    title: "枚方市公式サイト",
    url: "https://www.city.hirakata.osaka.jp/",
    license: "official",
    note: "市の公式情報。出典明記で引用可。",
  },
  {
    title: "枚方市オープンデータポータル",
    url: "https://www.city.hirakata.osaka.jp/category/2-14-23-0-0.html",
    license: "cc-by",
    note: "CC BY 4.0相当。出典明記で再利用可。",
  },
  {
    title: "e-Stat 政府統計",
    url: "https://www.e-stat.go.jp/",
    license: "cc-by",
    note: "政府統計CC BY 4.0。市区町村別データ取得可。",
  },
  {
    title: "大阪府オープンデータポータル",
    url: "https://odp.jig.jp/",
    license: "cc-by",
  },
  {
    title: "国土地理院 地理院地図",
    url: "https://maps.gsi.go.jp/",
    license: "official",
    note: "地図・ハザード情報。出典明記で利用可。",
  },
  {
    title: "気象庁",
    url: "https://www.jma.go.jp/",
    license: "official",
    note: "気象・防災情報。",
  },
  {
    title: "大阪府警 枚方警察署",
    url: "https://www.police.pref.osaka.lg.jp/hokubu/hirakata/",
    license: "official",
  },
  {
    title: "枚方市観光協会",
    url: "https://www.hirakata-kanko.org/",
    license: "official",
  },
];

export function findSourceByUrl(url: string): SourceEntry | undefined {
  return officialSources.find((s) => url.startsWith(s.url));
}
