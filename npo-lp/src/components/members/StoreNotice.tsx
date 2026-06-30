export function StoreNotice() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
      <p className="font-bold">📦 データ保存の設定がまだ完了していません</p>
      <p className="mt-2">
        この機能でデータを保存・共有するには、無料の Upstash Redis を接続してください。
        設定が完了するまでは、追加・削除はできますが保存されません。
      </p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs">
        <li>
          <a
            href="https://console.upstash.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-accent-orange hover:underline"
          >
            Upstash Console
          </a>
          で無料アカウント作成 → Redis データベースを1つ作成
        </li>
        <li>「REST API」の URL と TOKEN をコピー</li>
        <li>
          Vercel の環境変数に
          <code className="mx-1 rounded bg-white px-1">UPSTASH_REDIS_REST_URL</code>
          と
          <code className="mx-1 rounded bg-white px-1">UPSTASH_REDIS_REST_TOKEN</code>
          を設定
        </li>
        <li>再デプロイ（vercel deploy --prod）</li>
      </ol>
    </div>
  );
}
