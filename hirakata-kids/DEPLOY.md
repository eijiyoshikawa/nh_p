# hirakata-kids デプロイ手順（Vercel）

## 概要

- フレームワーク: Next.js 16（App Router, Turbopack）
- ビルド成果物: 静的ページ（SSG）99+ページ
- ホスティング: Vercel
- リージョン: `hnd1`（東京 / 国内ユーザー向けに最適）

## 既存 `npo-hirakata` プロジェクトとの関係

本リポジトリ `eijiyoshikawa/npo_hirakata` には以下2つの独立したアプリが同居しています。

| ディレクトリ | 目的 | Vercel プロジェクト |
|---|---|---|
| `npo-lp/` | NPO公式LP（既存） | `npo-hirakata` → `npo-hirakata.vercel.app` |
| `hirakata-kids/` | 子育てメディア（本書対象） | `hirakata-kids`（新規作成）→ `hirakata-kids.vercel.app` |

**既存 `npo-hirakata` プロジェクトには一切変更を加えません。** 新規に別のVercelプロジェクトを作成し、Root Directoryを `hirakata-kids` に設定することで並行稼働させます。

`hirakata-kids/vercel.json` の `ignoreCommand` により、コミット内容が `hirakata-kids/` 配下に無い場合は本プロジェクトのビルドをスキップします。既存プロジェクトも同様に Vercel ダッシュボード → Settings → Git → Ignored Build Step で `git diff --quiet HEAD^ HEAD -- .` を設定しておくと、相互に不要なビルドを避けられます（任意）。

## 初回セットアップ

### 1. Vercelプロジェクト作成

Vercelダッシュボードで「Add New…」→ 「Project」→ GitHub連携でリポジトリ `eijiyoshikawa/npo_hirakata` を選択。

**重要**: 既存 `npo-hirakata` プロジェクトは削除せず、追加で新規プロジェクトを作成します。

プロジェクト設定で以下を指定：

| 項目 | 値 |
|---|---|
| **Project Name** | `hirakata-kids`（任意） |
| **Root Directory** | `hirakata-kids`（必須 — これで既存LPと隔離される） |
| **Framework Preset** | Next.js（自動検出） |
| **Build Command** | `npm run build`（デフォルト） |
| **Install Command** | `npm install`（デフォルト） |
| **Output Directory** | `.next`（デフォルト） |
| **Production Branch** | `main` または `claude/hirakata-seo-media-YT3lT` を一時的に指定 |

### 2. 環境変数

Vercel ダッシュボード → Settings → Environment Variables で追加：

| 変数名 | 値 | 環境 | 用途 |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://hirakata-kids.jp` 等 | Production | sitemap/OGP絶対URL |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | （オプション） | 記事生成用。Vercel上ではなくローカル生成用途のみ |

- `NEXT_PUBLIC_SITE_URL` は本番ドメイン確定後に必ず設定（未設定時は `src/lib/site.ts` の例示ドメインにフォールバック）
- `ANTHROPIC_API_KEY` は Vercel には登録しない（記事生成はローカルで `npm run generate` を実行）

### 3. 独自ドメイン設定

Vercel ダッシュボード → Settings → Domains で独自ドメインを追加 → DNS設定（A/CNAMEレコード）を伝達。SSL証明書は自動発行。

## ブランチ → 環境のマッピング

| ブランチ | Vercel環境 | URL例 |
|---|---|---|
| `main` | Production | `https://hirakata-kids.jp` |
| `claude/hirakata-seo-media-YT3lT` | Preview | `https://hirakata-kids-<hash>.vercel.app` |
| その他PR | Preview | 自動デプロイURL |

## 記事公開フロー

1. ローカル or Claude Code agent で `npm run generate -- ...` 実行
2. 生成された `content/articles/<slug>.mdx` をレビュー・修正
3. frontmatter の `draft: true` を削除（または `false` に変更）
4. `git commit` & `git push`
5. Vercel が自動ビルド・デプロイ（約1〜3分）

## モニタリング観点

- Vercel Analytics でパフォーマンス・アクセス確認
- Vercel Logs でビルドエラー・SSR エラー監視
- Google Search Console でインデックス状況確認（導入は別途）

## ビルド時間の目安

- 初回フルビルド：約60〜90秒（記事数・OGP数に比例）
- インクリメンタル：約30〜60秒
- OGP画像生成：Noto Sans JP OTFの初回ダウンロードで +10秒程度（以降はビルドキャッシュでヒット）

## トラブルシューティング

### OGP画像生成失敗
`Failed to fetch Noto Sans JP Bold` → raw.githubusercontent への到達性を確認。恒久対策としてフォント file を `public/fonts/` にバンドルする方針に切り替え可能。

### `NEXT_PUBLIC_SITE_URL` 未設定で sitemap/OGP URLが example.jp
本番デプロイ前に必ず Vercel env に設定。設定後は再デプロイが必要。

### 記事が表示されない
`draft: true` が残っていないか確認。`src/lib/content.ts` は draft 記事をスキップします。
