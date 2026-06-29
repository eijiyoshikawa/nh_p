import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "site_pw_ok";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}
