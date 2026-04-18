import { ImageResponse } from "next/og";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { getCategory } from "@/lib/categories";
import { site } from "@/lib/site";
import {
  loadNotoSansJpBold,
  ogContentType,
  ogSize,
  ogTheme,
} from "@/lib/og";

export const alt = "記事 OGP";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const all = await getAllArticles();
  return all
    .filter((a) => !!a.subcategory)
    .map((a) => ({
      category: a.category,
      slug: a.subcategory!,
      article: a.slug,
    }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string; article: string }>;
}) {
  const { category, slug, article } = await params;
  const data = await getArticleBySlug(article);
  const cat = getCategory(category);
  const sub = cat?.subcategories.find((s) => s.slug === slug);

  const eyebrow = cat
    ? sub
      ? `${site.name} / ${cat.label} / ${sub.label}`
      : `${site.name} / ${cat.label}`
    : site.name;
  const title = data?.title ?? site.name;
  const description = data?.description ?? "";
  const truncatedDesc =
    description.length > 100 ? `${description.slice(0, 100)}…` : description;
  const titleFontSize = title.length > 22 ? 64 : 80;

  const font = await loadNotoSansJpBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: ogTheme.background,
          borderLeft: `24px solid ${ogTheme.accent}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: ogTheme.eyebrow,
            letterSpacing: 2,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleFontSize,
            color: ogTheme.text,
            marginTop: 18,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        {truncatedDesc && (
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: ogTheme.secondary,
              marginTop: 24,
              lineHeight: 1.5,
            }}
          >
            {truncatedDesc}
          </div>
        )}
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 22,
            color: ogTheme.accent,
          }}
        >
          {site.shortName} · 枚方市の子育て情報メディア
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans JP", data: font, style: "normal", weight: 700 },
      ],
    }
  );
}
