# NPO LP サイト — 引き継ぎ資料（次セッション用）

最終更新: 2026-06 / 担当セッション: メンバー専用サイト機能の実装完了

---

## 1. 概要

ひらかた子ども食堂支援NPO（設立準備中・暫定運営：三慧経営顧問株式会社）の
公式LP＋**メンバー専用サイト**。緑基調・Next.js 16 / React 19 / Tailwind v4 / TS。

- リポジトリ: `eijiyoshikawa/npo_hirakata`（モノレポ：`npo-lp/` と `hirakata-kids/` が同居）
- **本番ブランチ: `main`**（このサイトの正）
- 本番URL: https://npo-hirakata.vercel.app
- Vercel プロジェクト: `npo-hirakata`（Root Directory: `npo-lp`）
- デプロイ: **GitHub連携が切れているため手動**（`vercel deploy --prod`）

---

## 2. 実装済み（このセッションで完了）

### サイト全体
- 緑基調へのリブランド（orange→green 一括）
- 全ページのパスワードロック（`middleware.ts` + `/login`、`SITE_PASSWORD` で制御、30日Cookie）
- OGP画像（`opengraph-image.tsx`）、themeColor、モバイル最適化
- LP に FAQ・ロードマップ・メンバープレビューを追加
- LINE公式URL を実URLに（`lin.ee/QgUpPrz`）

### メンバー専用エリア（`/members` ハブ）
- 11名のメンバーデータ（noa-group 動物占い結果を手入力）
- 各メンバー詳細：動物キャラ・3軸（心理/行動/思考）・グループ共通性格・自己申告比較・**相性診断**
- 役職（竹谷＝**理事長**、他＝未定）／プロフィール写真（角丸四角・絵文字フォールバック）／SNSリンク枠
- 組織傾向チャート（グループ分布・動物分布・3軸分布）
- `/members/calendar` 活動カレンダー（追加/削除）
- `/members/board` お知らせ掲示板（投稿/固定/削除）
- `/members/tasks` タスクかんばん（3列・担当者・期限）
- `/members/docs` 資料・議事録リンク集
- `/members/dashboard` 資金調達進捗＋助成金ステータス
- ログアウトボタン

### データ層
- `lib/members.ts` … メンバー＋動物占い＋相性ロジック
- `lib/animalFortune.ts` … 12動物・3グループ・3軸定義
- `lib/orgData.ts` … 資金/助成金/資料（手動更新用）
- `lib/store.ts` + `/api/store/[collection]` … Upstash Redis REST（カレンダー/お知らせ/タスク）

---

## 3. ⚠️ 残っている手動作業（ユーザー側アクション）

### A. 写真表示（Drive共有設定）
Google フォーム回答フォルダの写真を「リンクを知っている全員が閲覧可」に設定する。
未設定の間は動物絵文字が出る（壊れない）。

### B. データ保存の有効化（Upstash 無料DB）
カレンダー・お知らせ・タスクの保存に必要。
1. https://console.upstash.com/ で Redis DB 作成
2. `vercel env add UPSTASH_REDIS_REST_URL production`
3. `vercel env add UPSTASH_REDIS_REST_TOKEN production`
4. `vercel deploy --prod`

### C. 毎回のデプロイ（GitHub連携が切れているため）
```bash
cd ~/npo_hirakata/npo-lp
git pull origin main
npm install
vercel deploy --prod
```
→ 恒久対応するなら Vercel の Settings → Git で GitHub 連携を再接続し
   Production Branch を `main` に設定（以降 `git push origin main` で自動デプロイ）。

---

## 4. 後から自分で編集できる箇所（編集→push→deploy）

| やりたいこと | ファイル |
|---|---|
| SNSリンク追加 | `src/lib/members.ts` の各 `sns: {}` |
| 役職変更 | `src/lib/members.ts` の `MEMBER_EXTRAS` |
| 資金額・助成金ステータス | `src/lib/orgData.ts` |
| 資料・議事録リンク | `src/lib/orgData.ts` の `documents` |
| LP本文・LINE URL | `src/lib/content.ts` |
| パスワード変更 | Vercel env `SITE_PASSWORD` |

---

## 5. 次セッションでの候補（未着手）

- メンバー相互の連絡先（任意公開）・プロフィール編集をサイトから
- 子ども食堂の開催実績マップ／写真ギャラリー
- 寄付フォーム・ふるさと納税CFへの導線強化
- メール通知（お知らせ投稿時に Slack/LINE 通知）
- アクセス解析（GA4 / Vercel Analytics）
- 動物占いの相性を「ペア表」で一覧化
- メンバー写真を `public/members/` に同梱する方式へ移行（Drive共有が難しい場合）

---

## 6. 同居プロジェクト（参考）

`hirakata-kids/`（別ブランチ群で開発）— 枚方の子育てメディア。
記事量産パイプライン（Gemini/Groq）あり。`media_start` ブランチが本番。
このサイト（npo-lp）とは独立。詳細は `hirakata-kids/README.md`。
