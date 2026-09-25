import { readFile } from "fs/promises";
import path from "path";

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = {
  background: "#faf8f5",
  ink: "#1a1a1a",
  muted: "#6b7280",
  rule: "#e5e2dc",
};

const FONT_DIR = path.join(process.cwd(), "node_modules/@fontsource/inter/files");

/** Inter regular + bold for ImageResponse (satori needs ttf/otf/woff, not woff2) */
export async function loadOgFonts() {
  const [regular, bold] = await Promise.all([
    readFile(path.join(FONT_DIR, "inter-latin-400-normal.woff")),
    readFile(path.join(FONT_DIR, "inter-latin-700-normal.woff")),
  ]);
  return [
    { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}
