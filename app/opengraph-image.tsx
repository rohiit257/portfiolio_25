import { ImageResponse } from "next/og";

export const alt = "Rohit Shahi — Software Engineer building AI and full-stack products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "#f8f8f6", color: "#111", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: 20, letterSpacing: "0.16em", textTransform: "uppercase", color: "#656a6c" }}>
        <div style={{ width: 12, height: 12, borderRadius: 20, background: "#718b89" }} />
        Portfolio · Mumbai, India
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 78, fontWeight: 600, letterSpacing: "-0.055em", lineHeight: 1 }}>Rohit Shahi</div>
        <div style={{ fontSize: 32, color: "#4c5558" }}>Software Engineer · AI & Full-Stack</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #d9dcda", paddingTop: 22, fontSize: 19, color: "#656a6c" }}>
        <span>Agentic AI · Real-Time Systems · Product Engineering</span>
        <span>rohitdebugbugs.in</span>
      </div>
    </div>,
    { ...size },
  );
}
