# nexia-lp — NPO法人ミライラボネクシア 公式サイト（一般公開用）

枚方市内の子ども食堂を支援するNPO法人（2026年秋設立予定）の公式LP。
**パスワードなし・誰でも見られる**団体の顔。メンバー限定の `../npo-lp/` とは別プロジェクト。

- 本番URL: https://mirai-lab-nexia.vercel.app（Vercel プロジェクト `mirai-lab-nexia`）
- コンセプト: 「子ども食堂を、枚方のブランドに。」
- 技術: Next.js 16（App Router）, React 19, Tailwind CSS v4, TypeScript
- 配色: ラボブルー `#2457C5` × サンライズイエロー `#FFB703`（npo-lp の緑とは差別化）
- 構成設計書: `../docs/nexia-lp-plan.md`

---

## ページ構成

| URL | 内容 |
|---|---|
| `/` | トップLP（14セクション：Hero → 対象別導線 → ビジョン → 課題 → 5つの「したい」 → 学童×食堂モデル → 子ども会議サイクル → 3つの活動 → ロードマップ → 連携 → 将来構想 → お知らせ → FAQ → CTA） |
| `/concept` | 新しい子ども食堂のかたち（コンセプト詳細） |
| `/join` | 関わる（子ども・保護者／食堂運営者／飲食店・企業／行政・団体／個人サポーター） |
| `/about` | 団体概要（名前の由来・代表メッセージ・法人概要・沿革） |
| `/news`, `/news/[slug]` | お知らせ |
| `/faq` | よくある質問 |
| `/contact` | お問い合わせ（フォーム＋LINE） |
| `/privacy` | プライバシーポリシー |
| `/opengraph-image` | SNSシェア画像（自動生成） |
| `/sitemap.xml`, `/robots.txt` | 自動生成 |

---

## 文言・データの編集（非エンジニア向け）

**すべてのテキストは `src/lib/site.ts` にあります。** ここを書き換えるだけでサイト全体に反映されます。

| 変更したいこと | 場所 |
|---|---|
| 団体名・代表者・所在地・メール・LINE URL | `site.ts` → `org` |
| キャッチコピー・ヒーロー文 | `site.ts` → `hero` |
| ビジョン／課題／5つの視点／モデル／子ども会議／3つの活動 | `site.ts` → 各 export |
| ロードマップの時期・内容 | `site.ts` → `roadmap` |
| FAQ | `site.ts` → `faq` |
| 参加ページの各対象の説明・流れ | `site.ts` → `joinDetails` |
| お知らせの追加 | `src/lib/news.ts` → `news` 配列に追加 |
| 本番URL（OGP・sitemap用） | `site.ts` → `siteUrl` |

---

## お問い合わせフォーム

- 環境変数 `NEXT_PUBLIC_FORM_ENDPOINT` に Formspree などのエンドポイントURLを設定すると、フォームから直接送信されます。
- 未設定の場合は **mailto** で `org.email` 宛にメーラーが開きます（デモ動作）。

```bash
vercel env add NEXT_PUBLIC_FORM_ENDPOINT production
# 例: https://formspree.io/f/xxxxxxxx
```

---

## ローカル開発

```bash
cd nexia-lp
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## デプロイ（Vercel）

Vercel プロジェクト `mirai-lab-nexia` は作成済み（初回デプロイ済み）。
ローカルからは一度だけ `vercel link` で紐づけ、以降は `vercel deploy --prod`。

```bash
cd ~/npo_hirakata/nexia-lp
vercel link       # 対話: eijiyoshikawa's projects → 既存の mirai-lab-nexia を選択
vercel deploy --prod
```

2回目以降は `git pull origin main && vercel deploy --prod`。

> GitHub 連携（push で自動デプロイ）を有効にするには https://github.com/apps/vercel で
> Vercel GitHub App を `npo_hirakata` にインストールし、Vercel の Settings → Git で接続。

---

## 主要ファイル

```
src/
├── app/
│   ├── layout.tsx            # メタデータ・JSON-LD・Header/Footer
│   ├── page.tsx              # トップ（セクションを並べるだけ）
│   ├── opengraph-image.tsx   # OGP画像
│   ├── sitemap.ts / robots.ts
│   ├── concept/ join/ about/ news/ faq/ contact/ privacy/
│   └── contact/ContactForm.tsx   # フォーム（Formspree or mailto）
├── components/
│   ├── Header.tsx / Footer.tsx / Logo.tsx / FaqList.tsx
│   ├── home/                 # トップの各セクション（Hero, AudienceNav, Vision, ...）
│   └── ui/                   # Button, Card, SectionHeading, PageHeader, ScrollReveal
└── lib/
    ├── site.ts               # ★ 全テキスト・データ
    └── news.ts               # お知らせ
```
