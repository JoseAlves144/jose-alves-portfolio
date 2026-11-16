import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/** Imagem Open Graph / Twitter gerada no build (1200×630). */
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#09090B",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(6,182,212,0.35), transparent 45%), radial-gradient(circle at 10% 100%, rgba(37,99,235,0.4), transparent 50%)",
          color: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg,#2563EB,#06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            JA
          </div>
          <div style={{ fontSize: 28, color: "#A1A1AA", display: "flex" }}>Data · Analytics · IA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 40, marginTop: 18, color: "#06B6D4", display: "flex" }}>{siteConfig.role}</div>
          <div style={{ fontSize: 26, marginTop: 24, color: "#A1A1AA", maxWidth: 900, display: "flex" }}>
            Prevenção a Fraudes · Saúde Suplementar · BI · Data Engineering · IA
          </div>
        </div>
      </div>
    ),
    size,
  );
}
