import { site } from "@/lib/site";

export function Cta() {
  return (
    <section className="mt-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 p-6 text-white">
      <h2 className="text-lg font-bold">このメディアについて</h2>
      <p className="mt-2 text-sm">
        {site.name}は{site.operator.name}が運営する枚方市の子育て世代向け地域情報メディアです。
        記事のご感想・訂正のご指摘・取材のご依頼はお気軽にお寄せください。
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <a
          href={site.operator.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-white px-4 py-2 font-semibold text-orange-700 transition hover:bg-orange-50"
        >
          運営会社を見る
        </a>
      </div>
    </section>
  );
}
