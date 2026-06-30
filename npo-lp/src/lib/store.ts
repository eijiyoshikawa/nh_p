// メンバー専用機能（カレンダー・タスク・お知らせ）の永続ストア。
//
// Upstash Redis の REST API を使う。各コレクションは「JSON 配列を1つの
// 文字列値として保存」するシンプルな構造（小規模チーム用途で十分）。
//
// 必要な環境変数（Vercel に設定）:
//   UPSTASH_REDIS_REST_URL    例: https://xxxx.upstash.io
//   UPSTASH_REDIS_REST_TOKEN  REST トークン
//
// 未設定の場合は isConfigured() が false を返し、UI 側は「セットアップ
// 待ち」を表示する（ビルド・表示は壊れない）。

const URL = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export function storeConfigured(): boolean {
  return Boolean(URL && TOKEN);
}

type Command = (string | number)[];

async function run<T = unknown>(cmd: Command): Promise<T> {
  if (!URL || !TOKEN) throw new Error("store not configured");
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`upstash ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as { result: T; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result;
}

export type StoreItem = { id: string } & Record<string, unknown>;

const keyFor = (collection: string) => `npo:${collection}`;

export async function readCollection<T extends StoreItem>(
  collection: string
): Promise<T[]> {
  if (!storeConfigured()) return [];
  const raw = await run<string | null>(["GET", keyFor(collection)]);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeCollection<T extends StoreItem>(
  collection: string,
  items: T[]
): Promise<void> {
  await run(["SET", keyFor(collection), JSON.stringify(items)]);
}

// 簡易ID（時刻 + ランダム）。サーバー側でのみ生成。
function genId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export async function addItem<T extends StoreItem>(
  collection: string,
  item: Omit<T, "id">
): Promise<T> {
  const items = await readCollection<T>(collection);
  const withId = { ...item, id: genId() } as T;
  items.push(withId);
  await writeCollection(collection, items);
  return withId;
}

export async function removeItem(
  collection: string,
  id: string
): Promise<void> {
  const items = await readCollection(collection);
  await writeCollection(
    collection,
    items.filter((i) => i.id !== id)
  );
}

export async function updateItem<T extends StoreItem>(
  collection: string,
  id: string,
  patch: Partial<T>
): Promise<void> {
  const items = await readCollection<T>(collection);
  const next = items.map((i) => (i.id === id ? { ...i, ...patch } : i));
  await writeCollection(collection, next);
}
