import { ImageResponse } from "next/og";
import { OG_COLORS, OG_SIZE, loadOgFonts } from "@/lib/og";
import { SITE_DESCRIPTION } from "@/lib/site";

export const alt = "woza.ink";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: OG_COLORS.background,
          color: OG_COLORS.ink,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", fontSize: 128, fontWeight: 700, letterSpacing: -4 }}>
          woza.ink
        </div>
        <div style={{ display: "flex", fontSize: 32, color: OG_COLORS.muted, marginTop: 24 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
