import { NextResponse } from "next/server";
import {
  addItem,
  readCollection,
  removeItem,
  storeConfigured,
  updateItem,
  type StoreItem,
} from "@/lib/store";

export const dynamic = "force-dynamic";

// メンバー専用機能のデータAPI。許可されたコレクションのみ受け付ける。
const ALLOWED = new Set(["events", "tasks", "announcements"]);

function guard(collection: string) {
  if (!ALLOWED.has(collection)) {
    return NextResponse.json({ ok: false, error: "unknown collection" }, { status: 404 });
  }
  if (!storeConfigured()) {
    return NextResponse.json(
      { ok: false, configured: false, items: [], error: "ストア未設定" },
      { status: 200 }
    );
  }
  return null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const g = guard(collection);
  if (g) return g;
  try {
    const items = await readCollection(collection);
    return NextResponse.json({ ok: true, configured: true, items });
  } catch (e) {
    return NextResponse.json(
      { ok: false, configured: true, items: [], error: String(e) },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const g = guard(collection);
  if (g) return g;
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }
  try {
    const item = await addItem(collection, body as Omit<StoreItem, "id">);
    return NextResponse.json({ ok: true, item });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const g = guard(collection);
  if (g) return g;
  let body: { id?: string; patch?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }
  if (!body.id) {
    return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
  }
  try {
    await updateItem(collection, body.id, body.patch ?? {});
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const g = guard(collection);
  if (g) return g;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
  }
  try {
    await removeItem(collection, id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
