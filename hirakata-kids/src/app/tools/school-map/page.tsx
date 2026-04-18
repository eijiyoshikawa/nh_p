import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { schools } from "@/lib/schools";
import { areas } from "@/lib/areas";
import { site } from "@/lib/site";
import { SchoolMapClient } from "./SchoolMapClient";

export const metadata: Metadata = {
  title: "学校マップ（簡易版）",
  description:
    "枚方市の公立小中学校をエリア別に絞り込める簡易一覧。通学区域の正式な確認は枚方市公式サイトで行ってください。",
  alternates: { canonical: `${site.url}/tools/school-map/` },
};

export default function SchoolMapPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "ツール", href: "/tools/" },
          { label: "学校マップ" },
        ]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        学校マップ（簡易版）
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        枚方市の代表的な公立小中学校をエリア別に絞り込める一覧です。
      </p>
      <p className="mt-3 rounded-lg bg-orange-50 p-3 text-xs leading-relaxed text-stone-700">
        本ツールは引っ越し・学区目安検討の補助を目的とした簡易版です。
        <strong>実際の通学区域は住所単位で指定されており、必ず枚方市公式サイトの通学区域表でご確認ください。</strong>
      </p>

      <SchoolMapClient schools={schools} areas={areas} />
    </div>
  );
}
