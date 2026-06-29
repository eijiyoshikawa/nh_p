import Link from "next/link";
import { BASE_ANIMALS, GROUP_LABELS, members } from "@/lib/members";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function MembersPreview() {
  return (
    <section id="members-preview" className="bg-green-50/40 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest text-accent-orange">
            TEAM / MEMBERS ONLY
          </p>
          <h2 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
            理事・スタッフ {members.length}名
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            生年月日から動物占いで算出した個性と、自己申告の意思決定軸（MOON/EARTH/SUN）で
            <br className="hidden sm:block" />
            一人ひとりの素質と組織全体の傾向を可視化しています。
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.slice(0, 6).map((m, i) => {
            const base = BASE_ANIMALS[m.character.base];
            const groupInfo = GROUP_LABELS[m.selfReportedGroup];
            return (
              <ScrollReveal key={m.slug} delay={i * 60}>
                <Link
                  href={`/members/${m.slug}/`}
                  className="group flex h-full items-center gap-3 rounded-2xl border-2 border-green-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
                >
                  <span aria-hidden className="text-3xl">
                    {base.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-text-primary group-hover:text-accent-orange">
                      {m.name}
                    </p>
                    <p className="truncate text-xs text-text-secondary">
                      {m.character.fullName}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${groupInfo.tone}`}
                  >
                    {groupInfo.label}
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href="/members/"
            className="inline-flex items-center gap-2 rounded-full bg-accent-orange px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accent-orange-dark"
          >
            メンバー全員と組織傾向を見る
            <span aria-hidden>→</span>
          </Link>
          <p className="mt-3 text-xs text-text-secondary">
            ※ メンバー専用ページのため、ログイン済みのメンバーのみ閲覧できます。
          </p>
        </div>
      </div>
    </section>
  );
}
