# npo_hirakata

ひらかた子ども食堂支援NPO 関連のモノレポ。2つの独立した Next.js プロジェクトが同居。

| ディレクトリ | プロジェクト | 本番URL | 本番ブランチ |
|---|---|---|---|
| `nexia-lp/` | **NPO法人ミライラボネクシア 公式LP（一般公開用）** | https://mirailabo-nexia.skma.asia | **`main`** |
| `npo-lp/` | NPOメンバー専用サイト（パスワード付） | https://npo-hirakata.vercel.app | **`main`** |
| `hirakata-kids/` | 枚方の子育てメディア（HIRAKIDS） | hirakata-kids.vercel.app | **`media_start`** |
| `docs/` | 内部ドキュメント（資金戦略・LINE連携 など） | — | — |

> 各プロジェクトの詳細は各ディレクトリの `README.md`、引き継ぎ要点は `HANDOFF.md` を参照。
> nexia-lp の構成設計書は `docs/nexia-lp-plan.md`。

---

## nexia-lp（一般公開用 公式LP）

「子ども食堂を、枚方のブランドに。」ラボブルー×イエロー。パスワードなし。
全文言は `nexia-lp/src/lib/site.ts` に集約。

```bash
cd nexia-lp
npm install
npm run dev
vercel && vercel deploy --prod   # 初回は新規プロジェクト作成
```

---

## npo-lp（メンバー専用サイト）

緑基調の LP ＋ パスワード保護のメンバー専用エリア。

- 公開: `/`, `/grants`, `/funding-strategy`, `/glossary`
- メンバー専用（`/members` ハブ）: 一覧・個人診断（動物占い）・カレンダー・お知らせ・タスク・資料・ダッシュボード
- 認証: `SITE_PASSWORD`（middleware）。データ保存: Upstash Redis（任意）

```bash
cd npo-lp
npm install
npm run dev     # localhost:3000
vercel deploy --prod   # 本番反映（GitHub連携が切れているため手動）
```

詳細・手動作業（写真のDrive共有、Upstash設定、デプロイ手順）は `npo-lp/HANDOFF.md`。

---

## hirakata-kids（子育てメディア）

枚方市の子育て世帯向け地域情報メディア。記事は MDX、生成パイプライン（Gemini/Groq）あり。
本番ブランチは `media_start`。詳細は `hirakata-kids/README.md`。

---

## ブランチ運用

- `main` … **npo-lp / nexia-lp の本番**
- `media_start` … **hirakata-kids の本番**
- `claude/*` … 作業ブランチ群

各プロジェクトは独立。`main` への push は npo-lp / nexia-lp に影響（それぞれ手動デプロイ）。
