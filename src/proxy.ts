import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/** True if the request carries Basic credentials whose password is `password` */
export function authorized(header: string | null, password: string | undefined): boolean {
  if (!password || !header?.startsWith("Basic ")) return false;
  const decoded = Buffer.from(header.slice(6), "base64").toString();
  const given = Buffer.from(decoded.slice(decoded.indexOf(":") + 1));
  const expected = Buffer.from(password);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/** /stats is private: HTTP Basic auth against STATS_PASSWORD (any username) */
export function proxy(request: NextRequest) {
  if (authorized(request.headers.get("authorization"), process.env.STATS_PASSWORD)) {
    return NextResponse.next();
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="woza.ink stats"' },
  });
}

export const config = { matcher: ["/stats", "/stats/:path*"] };
