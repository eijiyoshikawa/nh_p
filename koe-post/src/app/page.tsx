import Link from "next/link";
import KidShell, { PostIcon } from "@/components/KidShell";
import Icon from "@/components/Icon";
import { app } from "@/lib/content";

export default function Home() {
  return (
    <KidShell>
      <div className="animate-fade-in-up mt-6 text-center">
        <div className="animate-float mx-auto w-fit">
          <PostIcon size={120} />
        </div>
        <h1 className="mt-6 whitespace-pre-line text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          {"ここは、\nひみつのポスト。"}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-2">
          いえのこと、がっこうのこと、ともだちのこと。
          <br />
          こまっていることや、してほしいことを、
          <br />
          <span className="font-extrabold text-ink">なまえを かかずに</span> かけるよ。
        </p>
      </div>

      <ul className="animate-fade-in-up delay-100 mt-8 space-y-3">
        {[
          { icon: "check" as const, text: "なまえも、がっこうも、かかなくていい" },
          { icon: "check" as const, text: "かいたものは、しんじられる おとなだけが よむ" },
          { icon: "check" as const, text: "ともだちや かぞくには、みえない" },
        ].map((r) => (
          <li key={r.text} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-ink shadow-sm">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-leaf">
              <Icon name={r.icon} size={14} strokeWidth={2.6} />
            </span>
            {r.text}
          </li>
        ))}
      </ul>

      <div className="animate-fade-in-up delay-200 mt-10">
        <Link
          href="/write"
          className="tap flex w-full items-center justify-center gap-3 rounded-full bg-sky px-8 py-5 text-xl font-extrabold text-white shadow-lg shadow-sky/30 transition hover:bg-sky-dark active:scale-[0.98]"
        >
          <Icon name="chat" size={24} />
          かいてみる
        </Link>
        <p className="mt-3 text-center text-xs text-ink-3">3ぷんくらいで かけるよ</p>
      </div>

      <p className="animate-fade-in-up delay-300 mt-10 rounded-2xl bg-sun-soft px-4 py-3 text-center text-sm font-bold text-ink">
        {app.tagline}
      </p>
    </KidShell>
  );
}
