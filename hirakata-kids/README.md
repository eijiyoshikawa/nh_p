# hirakata-kids

枚方市の子育て世代（お子様4〜15歳）向け地域情報メディア（仮称：ひらかた子育てナビ / HIRAKIDS）。

運営：三慧経営顧問株式会社（NPO化までの暫定。`../npo-lp/` とは別プロジェクト）

## 技術スタック

- Next.js 16.2.2（App Router, Turbopack）
- React 19.2.4
- TypeScript 5.x
- Tailwind CSS v4
- MDX（`next-mdx-remote/rsc` + `gray-matter`）
- 構造化データ（Article / BreadcrumbList / FAQPage / Organization）

## ディレクトリ構造

```
hirakata-kids/
├── content/
│   └── articles/           # MDX 記事ファイル
├── src/
│   ├── app/
│   │   ├── [category]/
│   │   │   ├── page.tsx            # カテゴリ一覧
│   │   │   └── [slug]/page.tsx     # 記事詳細
│   │   ├── about/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx                # ホーム
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── article/        # Faq, Sources
│   │   ├── cards/          # ArticleCard, CategoryCard
│   │   ├── cta/            # Cta
│   │   └── layout/         # Header, Footer, Breadcrumb
│   └── lib/
│       ├── areas.ts        # エリアマスタ
│       ├── categories.ts   # カテゴリマスタ
│       ├── content.ts      # MDX ローダ
│       ├── seo.ts          # JSON-LD 生成
│       ├── site.ts         # サイト定数
│       ├── tags.ts         # 年齢・テーマタグ
│       └── types.ts        # 共通型
└── package.json
```

## ローカル開発

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド確認
npm run lint
```

## 記事の追加方法

1. `content/articles/<slug>.mdx` を新規作成（英数字 kebab-case）
2. frontmatter に必須項目を記述

```yaml
---
title: 記事タイトル
description: 80〜120字の要約
category: outings                   # categories.ts の CategorySlug
subcategory: parks                  # 任意
areaTags: [yamadaike]               # areas.ts の AreaSlug
ageTags: [age-infant, age-lower-elem]
themeTags: [free, stroller-ok]
author: HIRAKIDS編集部
publishedAt: "2026-04-15"
updatedAt: "2026-04-17"
sources:
  - title: 出典タイトル
    url: https://example.com/
faq:
  - q: よくある質問？
    a: 回答。
---
```

3. 本文は H2（`##`）以下で記述（H1 は title から自動生成）
4. `npm run dev` で `/category/slug/` にアクセス

## URL 設計

| 種別 | パターン |
|---|---|
| ホーム | `/` |
| カテゴリ | `/[category]/` |
| 記事 | `/[category]/[slug]/` |
| サイトマップ | `/sitemap.xml` |
| robots.txt | `/robots.txt` |

サブカテゴリ深掘りルート（`/[category]/[sub]/[slug]/`）・エリア/タグ索引・著者頁・特集(`/feature/[slug]/`)・ツール(`/tools/*`)・検索(`/search/?q=`)を実装済み。

## 量産パイプライン（plan + batch）

2025-02-01 から今日までの期間に毎日 1 記事を「公開済み」に見せかけるためのドラフト量産パイプラインがあります（`scripts/README.md` 参照）。

```bash
npm run plan                           # scripts/plan.json を生成
npm run batch -- --provider=template   # 無料：TODO付きの骨組みで全件ドラフト生成
npm run batch -- --provider=gemini     # 無料枠：Gemini 2.5 Flash で本文生成（GEMINI_API_KEY）
npm run batch -- --provider=claude     # 有料：Claude opus-4-7 で本文生成（ANTHROPIC_API_KEY）
```

生成されたドラフトは `draft: true` のまま書き出され、人間レビューで外すまで本番サイトには表示されません。

## 設計ドキュメント

- 情報設計全体像: `../docs/hirakata-kids-site-design.md`
- Next.js 16 固有の注意: `./AGENTS.md`
