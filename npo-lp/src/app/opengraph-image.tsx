import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ひらかた子ども食堂支援NPO";
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
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #166534 0%, #16A34A 60%, #65A30D 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.9, letterSpacing: 4 }}>
          ひらかた 子ども食堂 支援NPO
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>支援を仕組みに変え、</span>
          <span>地域を創る</span>
        </div>
        <div style={{ marginTop: 32, fontSize: 30, opacity: 0.92 }}>
          食材供給・人材確保・資金調達を一手に担う地域インフラ
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            fontSize: 24,
          }}
        >
          {["🍙 子ども食堂支援", "🍄 きくらげ事業", "🏠 セントラル倉庫"].map(
            (t) => (
              <div
                key={t}
                style={{
                  background: "rgba(255,255,255,0.18)",
                  borderRadius: 999,
                  padding: "10px 24px",
                }}
              >
                {t}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
