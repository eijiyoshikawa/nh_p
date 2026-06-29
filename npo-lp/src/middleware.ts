import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple shared-password gate for the NPO members-only LP.
// The expected password is read from SITE_PASSWORD at request time so it
// can be rotated via Vercel env vars without redeploying code.
//
// Excludes:
//   /api/auth/*  (login + logout endpoints)
//   /_next/*     (build assets)
//   /favicon.ico, /icon*, /manifest.*, /robots.txt, /sitemap.xml
//   anything ending in a common asset extension

export const config = {
  matcher: ["/((?!api/auth|_next/|favicon|icon|apple-icon|manifest|robots|sitemap|.*\\.(?:png|jpg|jpeg|svg|webp|mp4|webm|ico)$).*)"],
};

const COOKIE_NAME = "site_pw_ok";

export function middleware(req: NextRequest) {
  const expected = process.env.SITE_PASSWORD;

  // If no password is configured server-side, treat the site as open.
  // Useful for local development and accidental deletions in Vercel.
  if (!expected) return NextResponse.next();

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie === expected) return NextResponse.next();

  const url = req.nextUrl.clone();
  if (url.pathname === "/login") return NextResponse.next();

  url.pathname = "/login";
  url.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}
