import { timingSafeEqual } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

function isAuthorized(provided: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * POST /api/revalidate?path=/reading
 * Header `x-revalidate-secret: <token>` (or legacy `?secret=<token>`).
 * Force revalidation of a cached page.
 */
export async function POST(request: NextRequest) {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret");
  if (!isAuthorized(secret)) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path") ?? "/reading";
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path });
}
