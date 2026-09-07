import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Perspectives from "@/components/home/Perspectives";
import Model from "@/components/home/Model";
import Cycle from "@/components/home/Cycle";
import Activities from "@/components/home/Activities";
import Future from "@/components/home/Future";
import Cta from "@/components/home/Cta";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { vision } from "@/lib/site";

export const metadata: Metadata = {
  title: "コンセプト｜新しい子ども食堂のかたち",
  description:
    "「学童保育 × 子ども食堂」をイメージした新しい子ども食堂。子どもの「やりたい」から始まる子ども会議とプロジェクト、3つの活動、将来構想をまとめました。",
};

export default function ConceptPage() {
  return (
    <>
      <PageHeader
        eyebrow="CONCEPT"
        title="新しい子ども食堂のかたち"
        lead="「支援される場所」から「みんなが関わりたくなる場所」へ。私たちが考える子ども食堂の設計図です。"
      />
      <section className="px-4 py-16 sm:px-6 md:py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="whitespace-pre-line text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {vision.statement}
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-[1.9] text-ink-2 sm:text-base">
              {vision.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
      <Perspectives />
      <Model />
      <Cycle />
      <Activities />
      <Future />
      <Cta />
    </>
  );
}
