import { NextResponse } from "next/server";
import { deletePost, updatePost } from "@/lib/store";
import type { Status } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUSES: Status[] = ["new", "seen", "working", "done"];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: { status?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const patch: { status?: Status; note?: string } = {};
  if (body.status && STATUSES.includes(body.status as Status)) patch.status = body.status as Status;
  if (typeof body.note === "string") patch.note = body.note.slice(0, 4000);
  const updated = await updatePost(id, patch);
  if (!updated) return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true, post: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
