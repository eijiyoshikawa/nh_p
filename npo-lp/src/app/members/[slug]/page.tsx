import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  diagnosisFor,
  getMember,
  GROUP_LABELS,
  groupAgreement,
  members,
} from "@/lib/members";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) return {};
  return {
    title: `${m.name} — メンバー紹介`,
    description: `${m.name}（${m.occupation}）の個性診断と組織での役割。`,
    robots: { index: false, follow: false },
  };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) notFound();
  const dx = diagnosisFor(m);
  const groupInfo = GROUP_LABELS[m.selfReportedGroup];
  const agreement = groupAgreement(m);

  return (
    <div className="min-h-screen bg-warm-bg">
      <header className="border-b border-green-100 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link
            href="/members/"
            className="text-sm font-bold text-accent-orange hover:underline"
          >
            ← メンバー一覧へ戻る
          </Link>
          <p className="text-xs font-semibold tracking-widest text-text-secondary">
            MEMBERS ONLY
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex items-center justify-center md:h-24 md:w-24 md:shrink-0">
              <span aria-hidden className="text-7xl md:text-8xl">
                {dx?.emoji ?? "👤"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-text-secondary">{m.furigana}</p>
              <h1 className="mt-1 text-2xl font-bold text-text-primary md:text-3xl">
                {m.name}
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                {m.occupation}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 font-semibold ${groupInfo.tone}`}
                >
                  {groupInfo.label} 軸
                </span>
                {dx && (
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 font-semibold text-green-700">
                    {dx.animalName}（個性番号 #{dx.number}）
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-text-secondary">
            生年月日：{m.birthDate.replace(/-/g, "/")}
          </p>
        </section>

        {/* Self-reported group: authoritative */}
        <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold tracking-widest text-accent-orange">
            自己申告の意思決定軸
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <h2 className="text-xl font-bold text-text-primary">
              {groupInfo.label}
            </h2>
            <span className="text-sm text-text-secondary">{groupInfo.sub}</span>
          </div>

          {m.selfReportedGroup === "MOON" && (
            <p className="mt-3 text-sm leading-relaxed text-text-primary">
              MOON 軸の方は、全体の和を重んじ、感情と共感をもとに意思決定する傾向があります。
              場の空気を整え、長期的な信頼関係を築くのが得意で、組織の <strong>つなぎ役</strong> として真価を発揮します。
              即決即断より、相手の納得度を確認しながら進めるスタイルが向いています。
            </p>
          )}
          {m.selfReportedGroup === "EARTH" && (
            <p className="mt-3 text-sm leading-relaxed text-text-primary">
              EARTH 軸の方は、結果と実行を重んじ、ロジックと積み重ねで物事を進める傾向があります。
              一度任されたことは最後までやり切る <strong>実行力</strong> があり、組織の中核を担う存在として活躍します。
              短期の方針転換より、長期視点での確実な前進が向いています。
            </p>
          )}
          {m.selfReportedGroup === "SUN" && (
            <p className="mt-3 text-sm leading-relaxed text-text-primary">
              SUN 軸の方は、感性と直感を重んじ、ひらめきと勢いで道を切り開く傾向があります。
              立ち上げ期や勝負所での <strong>瞬発力</strong> が真価を発揮するシーンで、ゼロイチの場面で重宝されます。
              ルーチンより、変化と挑戦のある役割が向いています。
            </p>
          )}
        </section>

        {/* Animal diagnosis: calculated */}
        {dx && (
          <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold tracking-widest text-accent-orange">
              動物占い（生年月日から計算）
            </p>
            <div className="mt-2 flex items-baseline gap-3">
              <h2 className="text-xl font-bold text-text-primary">
                {dx.emoji} {dx.animalName}
              </h2>
              <span className="text-sm text-text-secondary">
                {dx.subtypeLabel}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-primary">
              {dx.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {dx.keywords.map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700"
                >
                  #{k}
                </span>
              ))}
            </div>

            {agreement === "mismatch" && (
              <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
                ※ 動物占いの計算上のグループ（{dx.group}）と、ご本人の自己申告（
                {m.selfReportedGroup}）が異なります。
                個性は様々な要因で形成されるため、両方の視点をあわせてご活用ください。
                組織内の役割は <strong>自己申告</strong> を優先しています。
              </p>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-accent-orange-dark">
                  強み
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-text-primary">
                  {dx.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 text-accent-orange">
                        ●
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-accent-orange-dark">
                  注意点
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-text-secondary">
                  {dx.cautions.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 text-stone-400">
                        ○
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold text-accent-orange-dark">
                NPO 内で活きる役割（例）
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {dx.suitedRoles.map((r) => (
                  <li
                    key={r}
                    className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-text-primary"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Profile from form */}
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-text-secondary">
              座右の銘
            </p>
            <p className="mt-2 text-base font-bold text-text-primary">
              {m.motto}
            </p>
          </div>
          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-text-secondary">
              趣味
            </p>
            <p className="mt-2 text-sm text-text-primary">{m.hobby}</p>
          </div>
          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm md:col-span-2">
            <p className="text-xs font-semibold tracking-widest text-text-secondary">
              参画動機
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-primary">
              {m.motivation}
            </p>
          </div>
          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm md:col-span-2">
            <p className="text-xs font-semibold tracking-widest text-text-secondary">
              得意なこと・やりたいこと
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-primary">
              {m.strengths}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
