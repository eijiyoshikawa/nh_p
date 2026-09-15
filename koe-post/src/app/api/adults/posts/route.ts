import { NextResponse } from "next/server";
import { readPosts, storeConfigured } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await readPosts();
  posts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json({ ok: true, configured: storeConfigured(), posts });
}
