import { aboutToMarkdown } from "@/lib/agents";

// Served at /about.md (and /about with Accept: text/markdown) via next.config.ts
export const dynamic = "force-static";

export function GET() {
  return new Response(aboutToMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
