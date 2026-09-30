import type { NextConfig } from "next";

/** Requests that prefer markdown (agents, CLI tools) get it on the normal URL */
const wantsMarkdown = [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return {
      // beforeFiles: must win over the /blog/[slug] page. On Vercel, rewrites run
      // before the CDN cache lookup, so HTML and markdown are cached separately.
      beforeFiles: [
        { source: "/blog/:slug.md", destination: "/md/blog/:slug" },
        { source: "/about.md", destination: "/md/about" },
        { source: "/blog/:slug", has: wantsMarkdown, destination: "/md/blog/:slug" },
        { source: "/about", has: wantsMarkdown, destination: "/md/about" },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/projects/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
