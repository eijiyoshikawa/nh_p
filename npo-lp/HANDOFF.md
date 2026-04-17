# NPO LP サイト — 引き継ぎ資料

## 概要

NPO法人ミライラボネクシア（ひらかた子ども食堂支援事業）の勧誘用LPサイト + 内部戦略ドキュメント。
Next.js 16 + Tailwind CSS v4。Vercelにデプロイ済み。

## 現在のリポジトリ

- リポジトリ: `eijiyoshikawa/npo_hirakata`
- ブランチ: `claude/npo-pdf-to-markdown-HDpUL`
- Vercel: `npo-hirakata.vercel.app`（Root Directory: `npo-lp`, Framework: Next.js）

## サイト構成（4ページ）

| ページ | パス | 内容 |
|--------|------|------|
| LP | `/` | Hero（動画背景）→ 課題 → 枚方DATA → 解決策 → メリット → 事業 → 資金 → リンク集 → メンバー → CTA |
| 資金戦略 | `/funding-strategy` | 行政系1,000万円達成のロードマップ・シミュレーション |
| 助成金リスト | `/grants` | 枚方市で使える20件の制度（カテゴリ別・優先度別） |
| 用語集 | `/glossary` | NPO・助成金・子ども食堂の専門用語22語 |

## LP構成（10セクション + リンク + メンバー）

| # | コンポーネント | 内容 |
|---|---------------|------|
| 1 | Hero.tsx | 動画背景 +「支援を仕組みに変え、地域を創る」+ CTA |
| 2 | Problem.tsx | 資金/人員/食材/持続性の4課題 + 統計3つ + 必要性タグ |
| 3 | CityData.tsx | 枚方市6統計 + インサイト文 |
| 4 | Solution.tsx | 課題→解決策マッピング4つ + 目標 |
| 5 | Benefits.tsx | CSR/雇用/発見/地域/空き家/食育の6カード |
| 6 | BusinessPlans.tsx | BSF循環機構の収益試算 + セントラル倉庫（機能一覧付き） |
| 7 | Funding.tsx | 補助金16種 + ふるさとCF + 3ステップ戦略 |
| — | リンクセクション | /grants, /funding-strategy, /glossary へのカード |
| 8 | MemberCarousel.tsx | メンバーカード 3秒自動横スクロール |
| 9 | CallToAction.tsx | LINE公式ボタン + 役割タグ |

## ファイル構成

```
npo-lp/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # lang="ja", OGPメタ
│   │   ├── page.tsx                # メインLP
│   │   ├── globals.css             # Tailwind + アニメーション定義
│   │   ├── funding-strategy/page.tsx
│   │   ├── grants/page.tsx
│   │   └── glossary/page.tsx
│   ├── components/
│   │   ├── Header.tsx              # ハンバーガーメニュー + 助成金リスト/資金戦略リンク
│   │   ├── Hero.tsx                # 動画背景（Pexels CDN）+ グラデーションフォールバック
│   │   ├── Problem.tsx
│   │   ├── CityData.tsx
│   │   ├── Solution.tsx
│   │   ├── Benefits.tsx
│   │   ├── BusinessPlans.tsx
│   │   ├── Funding.tsx
│   │   ├── CallToAction.tsx        # LINE公式ボタン（緑）
│   │   ├── MemberCarousel.tsx      # 3秒自動スクロール、hover/touch一時停止
│   │   ├── BgIllustrations.tsx     # SVGイラスト浮遊アニメーション
│   │   ├── FloatingCTA.tsx         # モバイル固定LINEボタン
│   │   ├── Footer.tsx
│   │   └── ui/
│   │       ├── StatCard.tsx
│   │       ├── SectionHeading.tsx
│   │       └── Card.tsx
│   └── lib/
│       ├── content.ts              # 全テキスト + lineUrl + members
│       ├── grants.ts               # 助成金20件のデータ
│       └── glossary.ts             # 用語22語のデータ
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

## デザイン仕様

- **配色**: オレンジ(#F97316) + グリーン(#22C55E)、背景(#FFFBF5)
- **LINEボタン**: #06C755（LINE公式カラー）
- **フォント**: システムフォント（Hiragino Kaku Gothic ProN / Noto Sans JP等）
- **レスポンシブ**: モバイルファースト、ハンバーガーメニュー、sm/md/lgブレークポイント
- **OGP**: LINE共有用のog:title/description/locale設定済み
- **背景**: SVGイラスト（家・木・ハート・お皿・人々・循環ループ）の浮遊アニメーション

## LINE連携

```
LP問い合わせボタン → LINE公式アカウント → Webhook → GAS → スプレッドシート
```

- セットアップ手順: `docs/line-integration/README.md`
- GASスクリプト: `docs/line-integration/gas-webhook.gs`
- 友だち追加・メッセージを自動記録、自動返信付き

## 差し替えが必要なダミーデータ

1. `src/lib/content.ts` → `lineUrl`: LINE公式アカウントのURLに差し替え
2. `src/lib/content.ts` → `members`: 実際のメンバー名・肩書き・ローマ字に差し替え
3. `src/components/Hero.tsx` → `VIDEO_URL`: ローカル動画に差し替える場合は `/hero-bg.mp4`
4. `docs/line-integration/gas-webhook.gs`: LINE_CHANNEL_ACCESS_TOKEN, SPREADSHEET_ID

## 開発メモ

- `npm run build` でビルド確認（全4ページが静的生成される）
- Vercelへのpushで自動デプロイ
- コンテンツ変更は `src/lib/content.ts` を編集するだけ（コンポーネント変更不要）
- 助成金の追加・削除は `src/lib/grants.ts` を編集
- 用語の追加・削除は `src/lib/glossary.ts` を編集
