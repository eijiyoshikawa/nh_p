import { NextResponse } from "next/server";
import { COOKIE_MAX_AGE, COOKIE_NAME, adultPassword, expectedToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const expected = adultPassword();
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADULT_PASSWORD が未設定です。Vercel の環境変数に設定してください。" },
      { status: 503 }
    );
  }
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }
  if (body.password !== expected) {
    return NextResponse.json({ ok: false, error: "パスワードが違います" }, { status: 401 });
  }
  const token = await expectedToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
