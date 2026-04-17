import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import {
  loadNotoSansJpBold,
  ogContentType,
  ogSize,
  ogTheme,
} from "@/lib/og";

export const alt = `${site.name} — 枚方市の子育て情報メディア`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
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
            fontSize: 28,
            color: ogTheme.eyebrow,
            letterSpacing: 4,
          }}
        >
          {site.shortName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            color: ogTheme.text,
            marginTop: 16,
            lineHeight: 1.15,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: ogTheme.secondary,
            marginTop: 24,
            lineHeight: 1.4,
          }}
        >
          枚方市の子育てを、もっと楽しく
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 22,
            color: ogTheme.accent,
          }}
        >
          運営: {site.operator.name}
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
