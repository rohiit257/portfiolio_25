import { ImageResponse } from "next/server";
import { PERSON, SEO } from "@/lib/site-config";

export const runtime = "edge";
export const alt =
  "Rohit Shahi - Full Stack Developer, Blockchain Engineer, and AI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
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
          background: "#101113",
          color: "#f3f4f6",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 28,
            color: "#aeb4bf",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#22c55e",
            }}
          />
          rohitdebugbugs.in
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -4 }}>
            {PERSON.name}
          </div>
          <div style={{ width: 880, fontSize: 36, lineHeight: 1.35, color: "#d1d5db" }}>
            {SEO.shortDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            fontSize: 26,
            color: "#d8dee8",
          }}
        >
          <span>Full Stack Developer</span>
          <span>Blockchain Engineer</span>
          <span>AI Engineer</span>
          <span>Solana Developer</span>
        </div>
      </div>
    ),
    size
  );
}
