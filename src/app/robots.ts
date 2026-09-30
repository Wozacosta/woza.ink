import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /md/* is the internal target of the public .md URLs; keep it out of indexes
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/md/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
