import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FaqList from "@/components/FaqList";
import Cta from "@/components/home/Cta";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "既存の子ども食堂との関係、利用条件、企業・飲食店の関わり方、寄付についてなど。",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="よくある質問" />
      <section className="px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FaqList />
        </div>
      </section>
      <Cta />
    </>
  );
}
