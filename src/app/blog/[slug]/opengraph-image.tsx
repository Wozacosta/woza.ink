import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug, getReadTime } from "@/data/blog";
import { OG_COLORS, OG_SIZE, loadOgFonts } from "@/lib/og";

export const alt = "woza.ink blog post";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "woza.ink";
  const date = post
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const meta = post ? `${date}  ·  ${getReadTime(post.content)} min read` : "";
  const tags = post?.tags.slice(0, 4) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: OG_COLORS.background,
          color: OG_COLORS.ink,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: OG_COLORS.muted, letterSpacing: 1 }}>
          {meta.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 55 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${OG_COLORS.rule}`,
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", gap: 20, fontSize: 26, color: OG_COLORS.muted }}>
            {tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>woza.ink</div>
        </div>
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
