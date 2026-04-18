// POST /api/newsletter/subscribe
//
// Accepts { email, source? } and either:
//   - forwards to NEWSLETTER_WEBHOOK_URL (Zapier / ConvertKit API /
//     Mailchimp API / Buttondown API — any HTTPS endpoint that accepts
//     JSON), OR
//   - logs and returns success when no webhook is configured.
//
// Deploy-time configuration lives entirely in env vars so this file
// does not need updates to point at different providers.
//
// Optional env vars:
//   NEWSLETTER_WEBHOOK_URL    HTTPS POST target (JSON body)
//   NEWSLETTER_WEBHOOK_HEADER "Authorization: Bearer …" style extra header

export const dynamic = "force-dynamic";

const EMAIL_RE =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return jsonError("invalid JSON body");
  }

  const email = (body.email ?? "").trim();
  const source = (body.source ?? "web").slice(0, 64);

  if (!email) return jsonError("メールアドレスを入力してください");
  if (email.length > 254) return jsonError("メールアドレスが長すぎます");
  if (!EMAIL_RE.test(email)) return jsonError("メールアドレスの形式が正しくありません");

  const payload = {
    email,
    source,
    subscribedAt: new Date().toISOString(),
  };

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  const extraHeader = process.env.NEWSLETTER_WEBHOOK_HEADER;

  if (webhook) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (extraHeader) {
      const [k, ...v] = extraHeader.split(":");
      if (k && v.length) headers[k.trim()] = v.join(":").trim();
    }
    try {
      const resp = await fetch(webhook, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        // Don't leak provider response bodies to the client — log only.
        console.error(
          `[newsletter] webhook responded ${resp.status}`,
          await resp.text().catch(() => "")
        );
        return jsonError("登録処理に失敗しました。時間をおいて再度お試しください。", 502);
      }
    } catch (err) {
      console.error("[newsletter] webhook fetch failed", err);
      return jsonError("登録処理に失敗しました。時間をおいて再度お試しください。", 502);
    }
  } else {
    // Development / pre-integration. Email isn't persisted here.
    console.log(
      "[newsletter] (stub) subscribe:",
      payload.email,
      "source=",
      payload.source
    );
  }

  return Response.json({ ok: true });
}
