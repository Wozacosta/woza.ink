import { generateRssFeed } from "@/lib/rss";

// Posts only change on deploy, so build the feed once at build time
export const dynamic = "force-static";

export async function GET() {
  const feed = await generateRssFeed();

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
