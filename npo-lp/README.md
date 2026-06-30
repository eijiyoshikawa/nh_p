# npo-lp — ひらかた子ども食堂支援NPO 公式サイト

枚方市の子ども食堂を支援するNPO（設立準備中。暫定運営：三慧経営顧問株式会社）の
公式LP＋メンバー専用サイト。

- 本番URL: https://npo-hirakata.vercel.app
- 技術: Next.js 16（App Router / Turbopack）, React 19, Tailwind CSS v4, TypeScript
- 配色: 緑基調（`--color-accent-orange` 変数名のまま緑値にマッピング）
- デプロイ: Vercel（GitHub連携が切れているため `vercel deploy --prod` で手動）

> モノレポ構成。同じリポジトリに子育てメディア `../hirakata-kids/` が同居。

---

## ページ構成

### 公開ページ（パスワード保護下）
| URL | 内容 |
|---|---|
| `/` | LP（Hero / 課題 / データ / 解決策 / メリット / 事業 / 資金 / ロードマップ / FAQ / メンバープレビュー / CTA） |
| `/grants` | 助成金・補助金リスト |
| `/funding-strategy` | 資金調達戦略 |
| `/glossary` | 用語集 |
| `/login` | パスワード入力（middleware から誘導） |

### メンバー専用（`/members` ハブ配下）
| URL | 内容 | データ保存 |
|---|---|---|
| `/members` | ハブ＋メンバー一覧＋組織傾向チャート | 静的 |
| `/members/[slug]` | 各メンバー詳細（動物占い・3軸・相性診断・SNS） | 静的 |
| `/members/calendar` | 活動カレンダー（追加/削除） | **Upstash** |
| `/members/board` | お知らせ・掲示板（投稿/固定/削除） | **Upstash** |
| `/members/tasks` | タスクかんばん（未着手/進行中/完了） | **Upstash** |
| `/members/docs` | 資料・議事録リンク集 | `orgData.ts` |
| `/members/dashboard` | 資金調達進捗＋助成金ステータス | `orgData.ts` |

---

## 認証（サイト全体のパスワードロック）

`src/middleware.ts` が全リクエストを `SITE_PASSWORD` で保護。Cookie 認証（30日保持）。

- `SITE_PASSWORD` 未設定 → 開発モード（誰でも閲覧可）
- ログイン: `/login` → `/api/auth/login`（httpOnly Cookie 発行）
- ログアウト: メンバーヘッダーのボタン → `/api/auth/logout`

```bash
# パスワード変更時のみ
vercel env rm SITE_PASSWORD production
vercel env add SITE_PASSWORD production
```

---

## データ保存（Upstash Redis）

カレンダー / お知らせ / タスクは Upstash Redis（無料枠）に保存。
`src/lib/store.ts` が REST API でアクセス。未設定でもページは動作（保存されないだけ）。

### セットアップ（未完了の場合）
1. https://console.upstash.com/ で無料の Redis DB を作成
2. REST API の URL / TOKEN をコピー
3. Vercel に環境変数を設定:
   ```bash
   vercel env add UPSTASH_REDIS_REST_URL production
   vercel env add UPSTASH_REDIS_REST_TOKEN production
   ```
4. `vercel deploy --prod`

API: `/api/store/[collection]`（`events` / `tasks` / `announcements`）, GET/POST/PATCH/DELETE。

---

## 手動で更新するデータ

| 対象 | ファイル |
|---|---|
| メンバー情報（動物占い・役職・写真ID・SNS） | `src/lib/members.ts` |
| 資金目標・助成金ステータス・資料リンク | `src/lib/orgData.ts` |
| LP本文・LINE URL・ナビ | `src/lib/content.ts` |

### メンバー写真について
Google フォーム回答フォルダの Drive ファイルIDを `members.ts` の `MEMBER_EXTRAS` に登録済み。
**表示には Drive 側で「リンクを知っている全員が閲覧可」の共有設定が必要**。
未設定時は動物絵文字にフォールバック（壊れない）。アバターは角丸四角形（`rounded-2xl/3xl`）。

### SNSリンクの追加
`members.ts` の各メンバー `sns: {}` に追記:
```ts
sns: { facebook: "https://...", instagram: "https://...", x: "https://...", line: "https://...", website: "https://..." }
```

---

## ローカル開発

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 本番ビルド確認
npm run lint    # ESLint
```

## デプロイ（手動・コピペ用）

```bash
cd ~/npo_hirakata/npo-lp
git pull origin main
npm install
vercel deploy --prod
```

> Production Branch は `main`。GitHub連携を再接続すれば `git push origin main` で自動デプロイ可。

---

## 主要ファイル

```
src/
├── middleware.ts                    # 全ページのパスワードゲート
├── app/
│   ├── opengraph-image.tsx          # SNSシェア用OG画像
│   ├── api/auth/{login,logout}/     # 認証
│   ├── api/store/[collection]/      # Upstashデータ操作
│   └── members/...                  # メンバー専用ページ群
├── components/
│   ├── members/
│   │   ├── MemberAvatar.tsx         # 写真（角丸四角）＋絵文字フォールバック
│   │   ├── MembersHubNav.tsx        # ハブのカードナビ
│   │   ├── MembersSubHeader.tsx     # サブページ共通ヘッダー
│   │   ├── LogoutButton.tsx
│   │   ├── CompatibilityCard.tsx    # 相性診断
│   │   ├── GroupChart / AnimalChart / AxisChart  # 組織傾向
│   │   ├── MemberSnsLinks.tsx
│   │   ├── useCollection.ts         # Upstashコレクション用フック
│   │   └── StoreNotice.tsx          # 未設定時の案内
│   └── ui/{ScrollReveal,CountUp,ScrollProgress}.tsx
└── lib/
    ├── members.ts        # 11名のメンバー＋動物占い＋相性ロジック
    ├── animalFortune.ts  # 12動物・3グループ・3軸の定義
    ├── orgData.ts        # 資金・助成金・資料（手動更新）
    ├── store.ts          # Upstash REST アダプタ
    └── content.ts        # LP本文・LINE URL
```
