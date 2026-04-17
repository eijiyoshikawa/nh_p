# npo_hirakata

ひらかた子ども食堂支援NPOの公式サイト＋内部ドキュメント

## リポジトリ構成

```
npo_hirakata/
├── npo-lp/                    # LP サイト（Next.js 16 + Tailwind CSS v4）
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # トップページ（LP）
│   │   │   ├── layout.tsx            # 共通レイアウト
│   │   │   ├── globals.css           # グローバルCSS + アニメーション
│   │   │   ├── funding-strategy/     # 資金調達戦略ページ
│   │   │   ├── grants/               # 助成金・補助金リストページ
│   │   │   └── glossary/             # 用語集ページ
│   │   ├── components/
│   │   │   ├── Header.tsx            # ナビゲーション（ハンバーガーメニュー対応）
│   │   │   ├── Hero.tsx              # ヒーロー（動画背景）
│   │   │   ├── Problem.tsx           # 課題セクション
│   │   │   ├── CityData.tsx          # 枚方市データ
│   │   │   ├── Solution.tsx          # 解決策
│   │   │   ├── Benefits.tsx          # メリット・可能性
│   │   │   ├── BusinessPlans.tsx     # 事業紹介（BSF循環機構・倉庫）
│   │   │   ├── Funding.tsx           # 資金調達戦略
│   │   │   ├── CallToAction.tsx      # CTA（LINE公式リンク）
│   │   │   ├── MemberCarousel.tsx    # メンバー紹介（自動横スクロール）
│   │   │   ├── BgIllustrations.tsx   # 背景イラストアニメーション
│   │   │   ├── FloatingCTA.tsx       # モバイル固定LINEボタン
│   │   │   ├── Footer.tsx
│   │   │   └── ui/                   # 共通UIコンポーネント
│   │   └── lib/
│   │       ├── content.ts            # LP全テキストデータ + LINE URL + メンバー
│   │       ├── grants.ts             # 助成金・補助金データ（20件）
│   │       └── glossary.ts           # 用語集データ（22語）
│   ├── package.json
│   └── next.config.ts
│
└── docs/                              # 内部ドキュメント
    ├── funding-strategy-admin.md      # ②行政系資金調達 骨組み（1,000万円計画）
    └── line-integration/
        ├── README.md                  # LINE→スプレッドシート連携手順
        └── gas-webhook.gs            # Google Apps Script（Webhook受信）
```

## サイト構成

| ページ | URL | 内容 |
|--------|-----|------|
| LP（トップ） | `/` | NPO紹介・勧誘用ランディングページ（8セクション + リンク + メンバー） |
| 資金調達戦略 | `/funding-strategy` | 2029年末1,000万円達成のロードマップ |
| 助成金リスト | `/grants` | 枚方市で申請可能な20件の制度一覧 |
| 用語集 | `/glossary` | NPO・助成金・子ども食堂の専門用語22語 |

## デプロイ

- **Vercel**: `npo-hirakata.vercel.app`
- **Root Directory**: `npo-lp`
- **Framework Preset**: Next.js
- **ブランチ**: `claude/npo-pdf-to-markdown-HDpUL` → push で自動デプロイ

## ローカル開発

```bash
cd npo-lp
npm install
npm run dev    # localhost:3000
npm run build  # ビルド確認
```

## 差し替えが必要なダミーデータ

| 項目 | ファイル | 現状 |
|------|---------|------|
| LINE公式URL | `src/lib/content.ts` → `lineUrl` | `https://line.me/R/ti/p/@000dummy` |
| メンバー一覧 | `src/lib/content.ts` → `members` | ダミー8名 |
| Hero動画 | `src/components/Hero.tsx` → `VIDEO_URL` | Pexels CDN URL |
| GASトークン | `docs/line-integration/gas-webhook.gs` | `YOUR_CHANNEL_ACCESS_TOKEN_HERE` |
| スプレッドシートID | `docs/line-integration/gas-webhook.gs` | `YOUR_SPREADSHEET_ID_HERE` |

## 技術スタック

- Next.js 16.2.2（Turbopack）
- React 19.2.4
- Tailwind CSS v4
- TypeScript 5.x
