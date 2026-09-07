import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqList from "@/components/FaqList";
import { faq } from "@/lib/site";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-paper-2 px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <SectionHeading eyebrow="FAQ" title="よくある質問" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <FaqList items={faq.slice(0, 4)} />
          <p className="mt-6 text-center">
            <Link href="/faq" className="text-sm font-bold text-brand hover:underline">
              すべての質問を見る →
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
