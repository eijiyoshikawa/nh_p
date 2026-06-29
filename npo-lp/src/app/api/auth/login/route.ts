import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "site_pw_ok";
// 30 days
const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(req: Request) {
  const expected = process.env.SITE_PASSWORD;
  if (!expected) {
    return NextResponse.json({ ok: true });
  }

  let body: { password?: string; from?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  if (body.password !== expected) {
    return NextResponse.json(
      { ok: false, error: "パスワードが違います" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true, redirect: body.from || "/" });
  res.cookies.set(COOKIE_NAME, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}
