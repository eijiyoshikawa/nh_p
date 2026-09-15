# こえポスト — 子ども専用・完全匿名の「こえ」投稿箱

子どもが家や学校で困っていること・してほしいことを、名前を出さずに書ける投稿箱。
**書いた内容は子ども本人にも他の子にも見えず、信頼できる大人（NPO・先生）だけが読みます。**
本文からいじめ・不登校・虐待・自傷などのサインを自動検知し、大人側で最優先に表示します。

- 設計書（原則・検知ルール・未決事項）: `../docs/koe-post-plan.md`
- 技術: Next.js 16 / Tailwind v4 / TypeScript（他プロジェクトと同構成）
- 運営: NPO法人ミライラボネクシア

## 画面

| URL | 誰が | 内容 |
|---|---|---|
| `/` | 子ども | 説明 → 「かいてみる」 |
| `/write` | 子ども | 4ステップ入力（どんなこと／だれに／本文／学年・学校コード） |
| `/sent` | 子ども | とどきました＋相談窓口（緊急サイン時は強調） |
| `/about` | 保護者・先生 | 何を集め、何を集めないか |
| `/adults/login` | 担当者 | パスワードログイン |
| `/adults` | 担当者 | 投稿一覧（緊急→要注意→通常）、絞込、対応状況、内部メモ、削除 |
| `/adults/stats` | 担当者 | タグ別 今週/先週/累計、カテゴリ別、学校コード別 |
| `/api/adults/export` | 担当者 | CSV ダウンロード |

## 環境変数（Vercel の Settings → Environment Variables）

| 変数 | 必須 | 内容 |
|---|---|---|
| `ADULT_PASSWORD` | **必須** | 担当者ログイン用の共通パスワード。未設定だと大人側に入れません |
| `UPSTASH_REDIS_REST_URL` | 本番必須 | Upstash Redis（無料枠）。未設定時はメモリ保存＝再起動で消える（デモ用） |
| `UPSTASH_REDIS_REST_TOKEN` | 本番必須 | 同上 |
| `RATE_SALT` | 任意 | 連投防止ハッシュの塩。ランダムな文字列を推奨 |

## 検知ルールの編集

`src/lib/safety.ts` の `RULES` 配列。タグ・緊急度・キーワードを追加するだけ。
照合前に全角半角・カタカナ→ひらがなを正規化するので、表記ゆれはある程度吸収します。

## ローカル

```bash
npm install
ADULT_PASSWORD=demo npm run dev   # http://localhost:3000
```

## デプロイ（Vercel）

Vercel プロジェクト `koe-post` は **GitHub 連携済み**（Root Directory `koe-post`、Production Branch `main`）。
`main` に push すると自動でデプロイされます。手動デプロイは不要です。

環境変数だけ最初に設定してください（ダッシュボード または CLI）:

```bash
cd ~/npo_hirakata/koe-post && vercel link   # 既存プロジェクト koe-post を選択（初回のみ）
vercel env add ADULT_PASSWORD production
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production
```
設定後、Vercel ダッシュボードで「Redeploy」するか、koe-post に変更を push すれば反映されます。

## 主要ファイル

```
src/
├── middleware.ts            # /adults/* と /api/adults/* をパスワード保護
├── lib/
│   ├── safety.ts            # ★ サイン検知ルール（辞書）
│   ├── store.ts             # Upstash Redis（メモリ fallback）
│   ├── auth.ts              # HMAC クッキー認証・日替わりハッシュ
│   ├── content.ts           # 子ども向け文言・相談窓口
│   └── types.ts
├── app/
│   ├── page.tsx, write/, sent/, about/      # 子ども側
│   ├── adults/{page,Dashboard,stats,login}  # 大人側
│   └── api/{posts, adults/*, auth/*}
└── components/{KidShell,Helplines,AdultShell,Icon,...}
```
