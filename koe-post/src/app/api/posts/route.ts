// 子どもからの投稿受付。GET は存在しない（子どもは読めない）。
import { NextResponse } from "next/server";
import { addPost, bumpCounter } from "@/lib/store";
import { classify } from "@/lib/safety";
import { dailyHash } from "@/lib/auth";
import type { Audience, Category, Grade } from "@/lib/types";

export const dynamic = "force-dynamic";

const CATEGORIES: Category[] = ["home", "school", "friends", "myself", "wish"];
const AUDIENCES: Audience[] = ["teacher", "npo", "any"];
const GRADES: Grade[] = ["low", "mid", "junior", "high", "unknown"];
const MAX_PER_DAY = 20;

export async function POST(req: Request) {
  let body: {
    body?: string;
    category?: string;
    audience?: string;
    grade?: string;
    schoolCode?: string;
    website?: string; // ハニーポット（人間は空のまま）
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // ハニーポットに値があれば bot とみなし、成功したふりをして捨てる
  if (body.website) return NextResponse.json({ ok: true });

  const text = (body.body ?? "").trim();
  if (text.length < 2) {
    return NextResponse.json({ ok: false, error: "もうすこし かいてね" }, { status: 400 });
  }
  if (text.length > 2000) {
    return NextResponse.json({ ok: false, error: "ながすぎます（2000もじまで）" }, { status: 400 });
  }
  const category = CATEGORIES.includes(body.category as Category) ? (body.category as Category) : "myself";
  const audience = AUDIENCES.includes(body.audience as Audience) ? (body.audience as Audience) : "any";
  const grade = GRADES.includes(body.grade as Grade) ? (body.grade as Grade) : "unknown";
  const schoolCode = (body.schoolCode ?? "").replace(/[^0-9A-Za-z-]/g, "").slice(0, 16);

  // 連投防止：IP は保存せず、日替わり塩付きハッシュのカウンタだけ
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const n = await bumpCounter(await dailyHash(ip), 60 * 60 * 24);
  if (n > MAX_PER_DAY) {
    return NextResponse.json(
      { ok: false, error: "きょうは たくさん おくってくれてありがとう。また あした かいてね" },
      { status: 429 }
    );
  }

  const { tags, urgency } = classify(text, category);
  await addPost({
    body: text,
    category,
    audience,
    grade,
    schoolCode,
    createdAt: new Date().toISOString(),
    tags,
    urgency,
    status: "new",
    note: "",
  });

  // 子どもには ID も内容も返さない。緊急度だけ返し、画面で窓口を強調する。
  return NextResponse.json({ ok: true, urgent: urgency === "urgent" });
}
