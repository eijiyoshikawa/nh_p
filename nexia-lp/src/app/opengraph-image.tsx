import { ImageResponse } from "next/og";
import { org, hero } from "@/lib/site";

export const runtime = "edge";
export const alt = `${org.name} — 子ども食堂を、枚方のブランドに。`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #FBFAF6 0%, #E7EEFC 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -120, width: 420, height: 420, borderRadius: 999, background: "#FFB703", opacity: 0.5 }} />
        <div style={{ position: "absolute", right: 120, bottom: -180, width: 380, height: 380, borderRadius: 999, background: "#3ECFA0", opacity: 0.35 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", position: "relative", width: 56, height: 56 }}>
            <div style={{ position: "absolute", left: 0, top: 4, width: 32, height: 32, borderRadius: 999, background: "#2457C5" }} />
            <div style={{ position: "absolute", left: 20, top: 4, width: 32, height: 32, borderRadius: 999, background: "#FFB703" }} />
            <div style={{ position: "absolute", left: 10, top: 22, width: 32, height: 32, borderRadius: 999, background: "#3ECFA0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 800, color: "#1B1F2A" }}>{org.name}</span>
            <span style={{ fontSize: 16, letterSpacing: 6, color: "#8A90A0", fontWeight: 700 }}>{org.en}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 80, fontWeight: 800, color: "#1B1F2A", lineHeight: 1.15, whiteSpace: "pre-line" }}>
            {hero.tagline}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#2457C5", background: "#fff", padding: "10px 22px", borderRadius: 999 }}>
              {org.status}
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#1B1F2A", background: "#FFB703", padding: "10px 22px", borderRadius: 999 }}>
              {org.area}
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
