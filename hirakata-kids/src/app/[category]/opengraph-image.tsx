import { ImageResponse } from "next/og";
import { categories, getCategory } from "@/lib/categories";
import { site } from "@/lib/site";
import {
  loadNotoSansJpBold,
  ogContentType,
  ogSize,
  ogTheme,
} from "@/lib/og";

export const alt = `${site.name} カテゴリ`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  const title = cat?.label ?? site.name;
  const description = cat?.description ?? "";
  const truncatedDesc =
    description.length > 80 ? `${description.slice(0, 80)}…` : description;
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
            letterSpacing: 3,
          }}
        >
          {site.name} / カテゴリ
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            color: ogTheme.text,
            marginTop: 12,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        {truncatedDesc && (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: ogTheme.secondary,
              marginTop: 24,
              lineHeight: 1.45,
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
          {site.shortName} — 枚方市の子育てを、もっと楽しく
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
