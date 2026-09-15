import { readPosts } from "@/lib/store";
import { TAG_LABEL, URGENCY_LABEL } from "@/lib/safety";
import { AUDIENCE_LABEL, CATEGORY_LABEL, GRADE_LABEL, STATUS_LABEL } from "@/lib/content";

export const dynamic = "force-dynamic";

function csv(v: string): string {
  return `"${v.replace(/"/g, '""')}"`;
}

export async function GET() {
  const posts = await readPosts();
  posts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  const header = ["投稿日時", "緊急度", "タグ", "カテゴリ", "見てほしい相手", "学年帯", "学校コード", "対応状況", "本文", "メモ"];
  const rows = posts.map((p) =>
    [
      p.createdAt,
      URGENCY_LABEL[p.urgency],
      p.tags.map((t) => TAG_LABEL[t]).join("／"),
      CATEGORY_LABEL[p.category],
      AUDIENCE_LABEL[p.audience],
      GRADE_LABEL[p.grade],
      p.schoolCode,
      STATUS_LABEL[p.status],
      p.body,
      p.note,
    ]
      .map(csv)
      .join(",")
  );
  const bom = "﻿";
  const text = bom + [header.map(csv).join(","), ...rows].join("\r\n");
  return new Response(text, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="koepost-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
