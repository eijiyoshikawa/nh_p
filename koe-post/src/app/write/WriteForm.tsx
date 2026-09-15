"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon, { type IconName } from "@/components/Icon";
import { audiences, categories, grades } from "@/lib/content";
import type { Audience, Category, Grade } from "@/lib/types";

// 1画面1アクションのステップ式フォーム。入力内容はブラウザに保存しない。
export default function WriteForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);
  const [audience, setAudience] = useState<Audience | null>(null);
  const [text, setText] = useState("");
  const [grade, setGrade] = useState<Grade>("unknown");
  const [schoolCode, setSchoolCode] = useState("");
  const [website, setWebsite] = useState(""); // ハニーポット
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const steps = ["どんなこと？", "だれに みてほしい？", "かいてみよう", "さいごに"];

  async function submit() {
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text, category, audience, grade, schoolCode, website }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; urgent?: boolean };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "おくれませんでした。もういちど ためしてね");
        setSending(false);
        return;
      }
      // 内容は手元に残さない
      setText("");
      router.replace(data.urgent ? "/sent?care=1" : "/sent");
    } catch {
      setError("おくれませんでした。もういちど ためしてね");
      setSending(false);
    }
  }

  return (
    <div className="animate-fade-in-up">
      {/* progress */}
      <ol className="mt-2 flex items-center gap-2" aria-label="すすみぐあい">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                i <= step ? "bg-sky text-white" : "bg-paper-2 text-ink-3"
              }`}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 && <span className={`h-1 flex-1 rounded ${i < step ? "bg-sky" : "bg-paper-2"}`} />}
          </li>
        ))}
      </ol>
      <h1 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">{steps[step]}</h1>

      {step === 0 && (
        <div className="mt-6 grid gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCategory(c.id);
                setStep(1);
              }}
              className={`tap flex items-center gap-4 rounded-3xl border-2 bg-white px-5 py-4 text-left transition active:scale-[0.99] ${
                category === c.id ? "border-sky" : "border-transparent hover:border-sky-soft"
              }`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-soft text-sky">
                <Icon name={c.icon as IconName} size={26} />
              </span>
              <span>
                <span className="block text-lg font-extrabold text-ink">{c.label}</span>
                <span className="block text-xs text-ink-2">{c.sub}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="mt-6 grid gap-3">
          {audiences.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => {
                setAudience(a.id);
                setStep(2);
              }}
              className={`tap rounded-3xl border-2 bg-white px-5 py-4 text-left transition active:scale-[0.99] ${
                audience === a.id ? "border-sky" : "border-transparent hover:border-sky-soft"
              }`}
            >
              <span className="block text-lg font-extrabold text-ink">{a.label}</span>
              <span className="block text-xs text-ink-2">{a.sub}</span>
            </button>
          ))}
          <button type="button" onClick={() => setStep(0)} className="tap text-sm font-bold text-ink-3">
            ← もどる
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6">
          <p className="text-sm text-ink-2">
            じょうずに かかなくて だいじょうぶ。ひとことでも いいよ。
            <br />
            「いつ」「どこで」「どんなこと」が あると、おとなが わかりやすいよ。
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            maxLength={2000}
            autoFocus
            className="mt-4 w-full rounded-3xl border-2 border-sky-soft bg-white p-4 text-base leading-relaxed text-ink placeholder:text-ink-3 focus:border-sky focus:outline-none"
            placeholder="ここに かいてね"
          />
          <p className="mt-1 text-right text-xs text-ink-3">{text.length} / 2000</p>
          {/* honeypot */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="tap rounded-full px-5 text-sm font-bold text-ink-3">
              ← もどる
            </button>
            <button
              type="button"
              disabled={text.trim().length < 2}
              onClick={() => setStep(3)}
              className="tap flex-1 rounded-full bg-sky px-6 text-lg font-extrabold text-white shadow-lg shadow-sky/30 transition hover:bg-sky-dark disabled:opacity-40"
            >
              つぎへ
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-sm font-bold text-ink">なんねんせい？（いわなくてもいいよ）</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {grades.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGrade(g.id)}
                  className={`tap rounded-full border-2 px-4 text-sm font-bold ${
                    grade === g.id ? "border-sky bg-sky-soft text-sky-dark" : "border-paper-2 bg-white text-ink-2"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-ink">がっこうの ばんごう（せんせいから きいていたら）</p>
            <input
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value)}
              inputMode="numeric"
              maxLength={16}
              className="tap mt-2 w-full rounded-2xl border-2 border-paper-2 bg-white px-4 text-base text-ink focus:border-sky focus:outline-none"
              placeholder="なければ そのままでOK"
            />
          </div>
          <div className="rounded-2xl bg-sun-soft px-4 py-3 text-sm text-ink">
            おくると、かいたものは この がめんから きえるよ。おとなが よんで、たいせつに あつかうね。
          </div>
          {error && <p className="rounded-2xl bg-danger-soft px-4 py-3 text-sm font-bold text-danger">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="tap rounded-full px-5 text-sm font-bold text-ink-3">
              ← もどる
            </button>
            <button
              type="button"
              disabled={sending}
              onClick={submit}
              className="tap flex-1 rounded-full bg-sky px-6 text-lg font-extrabold text-white shadow-lg shadow-sky/30 transition hover:bg-sky-dark disabled:opacity-60"
            >
              {sending ? "おくっています…" : "ポストに いれる"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
