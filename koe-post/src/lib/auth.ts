// 大人側の認証。共通パスワード（ADULT_PASSWORD）を HMAC したトークンを
// httpOnly Cookie に保存する。パスワードそのものは Cookie に入れない。
// Edge（middleware）でも Node でも動くよう Web Crypto を使う。

export const COOKIE_NAME = "koepost_adult";
export const COOKIE_MAX_AGE = 60 * 60 * 12; // 12時間で再ログイン

async function hmac(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function adultPassword(): string | undefined {
  return process.env.ADULT_PASSWORD;
}

export async function expectedToken(): Promise<string | null> {
  const pw = adultPassword();
  if (!pw) return null;
  return hmac("koepost-adult-v1", pw);
}

export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const exp = await expectedToken();
  return exp !== null && token === exp;
}

// 連投防止用：IP を「その日限りの塩」でハッシュ。投稿には保存しない。
export async function dailyHash(ip: string): Promise<string> {
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.RATE_SALT ?? "koepost";
  return (await hmac(`${ip}|${day}`, salt)).slice(0, 24);
}
