import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, adultPassword, isValidToken } from "@/lib/auth";

// 大人側（/adults/* と /api/adults/*）だけを保護する。
// 子ども側（/ /write /sent /about /api/posts）は認証なし。
export const config = {
  matcher: ["/adults/:path*", "/api/adults/:path*"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/adults/login") return NextResponse.next();

  const ok = await isValidToken(req.cookies.get(COOKIE_NAME)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/adults/login";
  if (!adultPassword()) url.searchParams.set("setup", "1");
  return NextResponse.redirect(url);
}
