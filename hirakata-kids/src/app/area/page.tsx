import type { Metadata } from "next";
import Link from "next/link";
import { areas } from "@/lib/areas";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "枚方市エリア別情報",
  description: "樟葉・牧野・枚方市駅・香里園・長尾・津田・藤阪・山田池など、枚方市のエリア別に子育て情報を探せます。",
  alternates: { canonical: `${site.url}/area/` },
};

export default function AreaIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "エリア" }]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        エリアから探す
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        枚方市内のエリア別に子育て情報を探せます。
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a) => (
          <Link
            key={a.slug}
            href={`/area/${a.slug}/`}
            className="group block rounded-xl border border-orange-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
          >
            <h2 className="text-base font-bold text-stone-900 group-hover:text-[#F97316]">
              {a.label}
            </h2>
            <p className="mt-2 text-sm text-stone-600">{a.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
