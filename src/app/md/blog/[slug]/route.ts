import { getAllSlugs, getPostBySlug } from "@/data/blog";
import { postToMarkdown } from "@/lib/agents";

// Served at /blog/<slug>.md (and /blog/<slug> with Accept: text/markdown) via next.config.ts
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const post = getPostBySlug((await params).slug);
  if (!post) return new Response("Not found\n", { status: 404 });

  return new Response(postToMarkdown(post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
