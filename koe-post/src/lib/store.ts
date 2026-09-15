// 投稿の永続ストア。
// Upstash Redis（REST）が設定されていればそれを使い、未設定ならプロセス内
// メモリに保存する（デモ／ローカル用。再起動で消える）。
//
// 環境変数（Vercel に設定）:
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN

import type { Post } from "./types";

const URL = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "koepost:posts";

export function storeConfigured(): boolean {
  return Boolean(URL && TOKEN);
}

async function run<T = unknown>(cmd: (string | number)[]): Promise<T> {
  const res = await fetch(URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`upstash ${res.status}`);
  const data = (await res.json()) as { result: T; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result;
}

// ---- メモリ fallback（モジュールスコープ。サーバーレスでは保証されない） ----
// Next.js はルートごとに別バンドルになるため、globalThis で1プロセス内共有にする
type Mem = { posts: Post[]; counters: Map<string, { n: number; exp: number }> };
const g = globalThis as unknown as { __koepostMem?: Mem };
const mem: Mem = (g.__koepostMem ??= { posts: [], counters: new Map() });

export async function readPosts(): Promise<Post[]> {
  if (!storeConfigured()) return mem.posts;
  const raw = await run<string | null>(["GET", KEY]);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Post[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writePosts(posts: Post[]): Promise<void> {
  if (!storeConfigured()) {
    mem.posts = posts;
    return;
  }
  await run(["SET", KEY, JSON.stringify(posts)]);
}

function genId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export async function addPost(post: Omit<Post, "id">): Promise<Post> {
  const posts = await readPosts();
  const withId = { ...post, id: genId() };
  posts.push(withId);
  await writePosts(posts);
  return withId;
}

export async function updatePost(id: string, patch: Partial<Post>): Promise<Post | null> {
  const posts = await readPosts();
  let updated: Post | null = null;
  const next = posts.map((p) => {
    if (p.id !== id) return p;
    updated = { ...p, ...patch, updatedAt: new Date().toISOString() };
    return updated;
  });
  if (updated) await writePosts(next);
  return updated;
}

export async function deletePost(id: string): Promise<void> {
  const posts = await readPosts();
  await writePosts(posts.filter((p) => p.id !== id));
}

// ---- 連投防止カウンタ（キーは日替わり塩付きハッシュ。投稿には紐づけない） ----
export async function bumpCounter(key: string, ttlSec: number): Promise<number> {
  if (!storeConfigured()) {
    const now = Date.now();
    const cur = mem.counters.get(key);
    if (!cur || cur.exp < now) {
      mem.counters.set(key, { n: 1, exp: now + ttlSec * 1000 });
      return 1;
    }
    cur.n += 1;
    return cur.n;
  }
  const n = await run<number>(["INCR", `koepost:rl:${key}`]);
  if (n === 1) await run(["EXPIRE", `koepost:rl:${key}`, ttlSec]);
  return n;
}
