import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BASE_ANIMALS,
  GROUP_LABELS,
  calculatedGroupOf,
  getMember,
  groupAgreement,
  members,
} from "@/lib/members";
import { MemberAvatar } from "@/components/members/MemberAvatar";
import { MemberSnsLinks } from "@/components/members/MemberSnsLinks";
import { CompatibilityCard } from "@/components/members/CompatibilityCard";

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
    title: `${m.name}（${m.character.fullName}） — メンバー紹介`,
    description: `${m.name}（${m.occupation}）の動物占い診断と組織での役割。`,
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
  const base = BASE_ANIMALS[m.character.base];
  const calcGroup = calculatedGroupOf(m);
  const calcGroupInfo = GROUP_LABELS[calcGroup];
  const selfGroupInfo = GROUP_LABELS[m.selfReportedGroup];
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
        {/* Hero block */}
        <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex items-center justify-center md:shrink-0">
              <MemberAvatar
                photoId={m.photoId}
                emoji={base.emoji}
                name={m.name}
                size="xl"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs text-text-secondary">{m.furigana}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    m.role === "理事長"
                      ? "bg-accent-orange text-white"
                      : "bg-stone-100 text-text-secondary"
                  }`}
                >
                  {m.role}
                </span>
              </div>
              <h1 className="mt-1 text-2xl font-bold text-text-primary md:text-3xl">
                {m.name}
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                {m.occupation}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 font-semibold ${calcGroupInfo.tone}`}
                >
                  {calcGroup} 軸（動物占い）
                </span>
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 font-semibold text-green-700">
                  {base.emoji} {m.character.fullName}
                </span>
              </div>
              <MemberSnsLinks sns={m.sns} className="mt-4" />
            </div>
          </div>
          <p className="mt-6 text-xs text-text-secondary">
            生年月日：{m.birthDate.replace(/-/g, "/")}
          </p>
        </section>

        {/* Animal character description */}
        <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold tracking-widest text-accent-orange">
            動物占い・個別キャラクター
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <h2 className="text-xl font-bold text-text-primary">
              {base.emoji} {m.character.fullName}
            </h2>
          </div>
          {m.character.description && (
            <p className="mt-3 text-sm leading-relaxed text-text-primary">
              {m.character.description}
            </p>
          )}

          {/* 3 axes */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-3">
              <p className="text-xs font-semibold text-emerald-800">心理ベクトル</p>
              <p className="mt-1 text-sm font-bold text-text-primary">
                {m.character.characterVector}
              </p>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-3">
              <p className="text-xs font-semibold text-amber-800">行動パターン</p>
              <p className="mt-1 text-sm font-bold text-text-primary">
                {m.character.behaviorPattern}
              </p>
            </div>
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-3">
              <p className="text-xs font-semibold text-indigo-800">思考パターン</p>
              <p className="mt-1 text-sm font-bold text-text-primary">
                {m.character.thinkingPattern}
              </p>
            </div>
          </div>

          {/* Base animal group traits */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-accent-orange-dark">
              {base.name}グループの共通性格
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
              {base.commonTraits.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Self-reported vs calculated */}
        <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold tracking-widest text-accent-orange">
            自己申告との比較
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div
              className={`rounded-lg border p-4 ${calcGroupInfo.tone}`}
            >
              <p className="text-xs font-semibold">動物占い（計算）</p>
              <p className="mt-1 text-lg font-bold">{calcGroup}</p>
              <p className="text-xs">{calcGroupInfo.sub}</p>
            </div>
            <div
              className={`rounded-lg border p-4 ${selfGroupInfo.tone}`}
            >
              <p className="text-xs font-semibold">自己申告</p>
              <p className="mt-1 text-lg font-bold">{m.selfReportedGroup}</p>
              <p className="text-xs">{selfGroupInfo.sub}</p>
            </div>
          </div>
          {agreement === "mismatch" ? (
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
              ※ 動物占いの結果（{calcGroup}）と、自己申告（{m.selfReportedGroup}）が異なります。
              「素質」と「本人が意識して発揮しているスタイル」のギャップとして、お互いの理解に活用してください。
            </p>
          ) : (
            <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs leading-relaxed text-emerald-800">
              動物占いの結果と自己申告が一致しています。素質と自己認識がそろっているタイプ。
            </p>
          )}
        </section>

        {/* Compatibility */}
        <CompatibilityCard member={m} />

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
