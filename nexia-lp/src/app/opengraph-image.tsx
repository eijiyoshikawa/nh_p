import { ImageResponse } from "next/og";
import { org, hero } from "@/lib/site";

export const runtime = "edge";
export const alt = `${org.name} — 子ども食堂を、枚方のブランドに。`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GREEN = "#4E6B33";
const GOLD = "#B69B47";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 72,
          background: "linear-gradient(135deg, #FCFBF7 0%, #EDF2E4 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -140, top: -140, width: 460, height: 460, borderRadius: 999, background: "#F6EFD8" }} />
        <div style={{ position: "absolute", right: 80, bottom: -200, width: 400, height: 400, borderRadius: 999, background: "#E8F1DC" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="88" height="88" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="95" fill="#fff" stroke={GOLD} strokeWidth="6" />
              <path d="M100 128 C84 128 74 116 74 104 C74 92 86 82 100 70 C114 82 126 92 126 104 C126 116 116 128 100 128 Z" fill={GOLD} />
              <path d="M100 78 C100 66 100 58 100 48" stroke={GREEN} strokeWidth="5" fill="none" />
              <path d="M100 56 C86 58 74 52 70 38 C84 34 98 42 100 56 Z" fill={GREEN} />
              <path d="M100 52 C112 46 124 42 132 30 C122 24 106 32 100 52 Z" fill={GREEN} />
              <path d="M38 92 C36 108 46 122 64 130 C74 135 86 139 98 140 L98 132 C86 130 76 126 68 118 C62 112 56 104 54 94 C52 88 44 86 38 92 Z" fill={GREEN} />
              <path d="M162 92 C164 108 154 122 136 130 C126 135 114 139 102 140 L102 132 C114 130 124 126 132 118 C138 112 144 104 146 94 C148 88 156 86 162 92 Z" fill={GREEN} />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 18, color: "#8A90A0", fontWeight: 700 }}>{org.descriptor}</span>
              <span style={{ fontSize: 32, fontWeight: 800, color: "#1B1F2A" }}>{org.name}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 80, fontWeight: 800, color: "#1B1F2A", lineHeight: 1.15, whiteSpace: "pre-line" }}>
              {hero.tagline}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: GREEN, background: "#fff", padding: "10px 22px", borderRadius: 999 }}>
                {org.status}
              </span>
              <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", background: GREEN, padding: "10px 22px", borderRadius: 999 }}>
                {org.area}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
