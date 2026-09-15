# nexia-lp — 引き継ぎ（次セッション用）

## これは何
NPO法人ミライラボネクシア（2026年秋設立予定・枚方市）の**一般公開用**公式LP。
デモサイトとして全ページ実装済み・ビルド/リント通過済み・**本番公開中: https://mirai-lab-nexia.vercel.app**

- 構成設計書: `docs/nexia-lp-plan.md`（ページ構成・セクション・トーン・ターゲット）
- 全文言: `src/lib/site.ts` ／ お知らせ: `src/lib/news.ts`

## 未完了（ユーザー側の手動作業）
- [ ] `site.ts` の `org`: 代表者名・所在地・メールアドレス（現在 `info@example.com`）
- [x] `site.ts` の `siteUrl` を https://mirailabo-nexia.skma.asia に設定済み
- [ ] `nameOrigin`（名前の由来）: 案なので実際の由来に修正
- [ ] `message`（代表メッセージ）: 設立準備室名義の仮文 → 代表名義に
- [ ] `roadmap` の時期・内容の確認
- [ ] お問い合わせフォームの送信先（Formspree 等）→ `NEXT_PUBLIC_FORM_ENDPOINT`
- [ ] 連携先ロゴ（`partners` セクションにプレースホルダーあり）
- [ ] 写真素材（現状は図形・絵文字のみ）
- [x] Vercel プロジェクト `mirai-lab-nexia` 作成・デプロイ済み → https://mirailabo-nexia.skma.asia
- [x] ローカル `vercel link` 済み。GitHub App も復旧 → `vercel git connect` で Git 接続すれば push だけで本番反映（`docs/vercel-github-integration.md`）
- [x] 独自ドメイン https://mirailabo-nexia.skma.asia 設定完了（Xserver CNAME → 3abd155664061ee4.vercel-dns-016.com、Vercel で Valid 確認済み）

## 次の候補
- 写真・イラスト差し込み（Hero、活動紹介）
- お知らせの MDX 化／CMS 化（microCMS / Notion）
- 寄付ページ（法人設立後、決済導線）
- Google Analytics / Vercel Analytics
- 英語ページ（行政・企業向け資料としての英語版概要）
- パートナー食堂一覧ページ（地図付き）
