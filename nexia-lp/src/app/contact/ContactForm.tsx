"use client";

import { useState, type FormEvent } from "react";
import { contactTypes, org } from "@/lib/site";
import Icon from "@/components/Icon";

// Posts to NEXT_PUBLIC_FORM_ENDPOINT (Formspree / Getform など) が設定されていれば
// fetch で送信。未設定の場合は mailto にフォールバックしてメーラーを開く。
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ defaultType = "general" }: { defaultType?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState(
    contactTypes.some((t) => t.value === defaultType) ? defaultType : "general"
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const typeLabel = contactTypes.find((t) => t.value === data.get("type"))?.label ?? "";

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`【お問い合わせ】${typeLabel}`);
      const body = encodeURIComponent(
        [
          `お名前: ${data.get("name")}`,
          `所属: ${data.get("org") || "-"}`,
          `メール: ${data.get("email")}`,
          `区分: ${typeLabel}`,
          "",
          String(data.get("message")),
        ].join("\n")
      );
      window.location.href = `mailto:${org.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const input =
    "mt-1 w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-3 focus:border-brand focus:outline-none";
  const isVoice = type === "voice";

  if (status === "sent") {
    return (
      <div className="rounded-3xl border-2 border-mint/50 bg-mint-soft p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand">
          <Icon name="check" size={28} strokeWidth={2.2} />
        </span>
        <p className="mt-2 font-extrabold text-ink">送信ありがとうございます</p>
        <p className="mt-2 text-sm text-ink-2">
          {ENDPOINT
            ? "内容を確認のうえ、設立準備室よりご連絡します。"
            : "メールソフトが開きます。開かない場合は下記アドレスへ直接お送りください。"}
        </p>
        {!ENDPOINT && <p className="mt-2 text-sm font-bold text-brand">{org.email}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="text-xs font-bold text-ink-2">お問い合わせの区分 *</span>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={input}
          required
        >
          {contactTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-bold text-ink-2">{isVoice ? "お名前（ニックネームOK）" : "お名前 *"}</span>
          <input name="name" required={!isVoice} className={input} autoComplete="name" placeholder={isVoice ? "例：ひらかたママ" : undefined} />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-ink-2">{isVoice ? "お住まいの地域（任意）" : "所属（団体・会社・店名など）"}</span>
          <input name="org" className={input} autoComplete={isVoice ? "off" : "organization"} placeholder={isVoice ? "例：枚方市 香里園" : undefined} />
        </label>
      </div>
      <label className="block">
        <span className="text-xs font-bold text-ink-2">{isVoice ? "メールアドレス（返信がほしい場合だけ）" : "メールアドレス *"}</span>
        <input name="email" type="email" required={!isVoice} className={input} autoComplete="email" />
      </label>
      <label className="block">
        <span className="text-xs font-bold text-ink-2">{isVoice ? "枚方のこと、ひとこと *" : "お問い合わせ内容 *"}</span>
        <textarea
          name="message"
          required
          rows={isVoice ? 4 : 6}
          className={input}
          placeholder={
            isVoice
              ? "例：放課後に子どもを預けられる場所が少ない／近所に子ども食堂があったらいいな"
              : "「話だけ聞きたい」でも大丈夫です。"
          }
        />
      </label>
      <label className="flex items-start gap-2 text-xs text-ink-2">
        <input type="checkbox" required className="mt-0.5" />
        <span>
          <a href="/privacy" className="font-bold text-brand underline">
            プライバシーポリシー
          </a>
          に同意します
        </span>
      </label>
      {status === "error" && (
        <p className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-bold text-coral">
          送信に失敗しました。時間をおいて再度お試しいただくか、{org.email} へ直接ご連絡ください。
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-brand px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
