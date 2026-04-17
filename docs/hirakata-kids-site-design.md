# 枚方市子育てメディア — サイト設計書（IA・URL・カテゴリ構造）

> 本書は、枚方市在住・子供4〜15歳の親世代をターゲットとした新規メディアサイトの情報設計フェーズの成果物。
> 実装（技術スタック確定・スキャフォールド）は次フェーズで別途行う。

## 1. 背景と目的

### 背景
既存リポジトリ `npo-lp/` は「ひらかた子ども食堂支援NPO」のランディングページであり、ブランドもターゲット（支援者・ボランティア）も異なる。親世代向け地域情報メディアを新規立ち上げるにあたり、配置・構造を独立させたうえで運営者としてNPOの権威性（E-E-A-T）を活かす方針。

### 決定事項（合意済み）
| 項目 | 決定 |
|---|---|
| サイト配置 | **独自ドメイン新設**（既存LPとは別プロジェクト） |
| ブランド位置づけ | **独立メディアブランド**（運営: NPO法人としてフッター/About頁に明示） |
| KPI優先度 | ①NPO寄付/ボランティア導線 ②LINE友だち登録 ③広告収益（AdSense） ④地域店舗・教室との提携PR記事 |

### 法的前提
他メディア（hira2.jp / hirakata.mypl.net / mrs.living.jp 等）の記事を**転載・自動置き換えすることは著作権法上不可**。合法的手段として以下に限定：
- 枚方市公式・国/府オープンデータ・政府統計等の一次情報の引用・再利用
- 独自取材・独自視点の記事
- 転載許諾を正式に取得した提携コンテンツ
- 見出し＋要約＋出典リンク形式の範囲内でのアグリゲーション

## 2. ブランド & ドメイン方針

- **ドメイン候補**（要取得確認）: `hirakata-kids.jp` / `hirakata-kosodate.com` / `hira-fam.jp`
- **メディア名（仮）**: 「ひらかた子育てナビ」「ひらパパまま」「HIRAKIDS」等 — ネーミング別途確定
- **運営者表記**: 「運営：ひらかた子ども食堂支援NPO」をフッター＋About頁に明示
- **配色（仮）**: 親世代向けに既存オレンジ `#F97316` を継承しつつ、信頼感のあるセカンダリ（青系 `#3B82F6` or ターコイズ）を追加検討

## 3. ターゲット & ペルソナ

| 属性 | 内容 |
|---|---|
| 年齢 | 30〜45歳 |
| 家族構成 | 子供4〜15歳（幼稚園年中〜中3） |
| 居住地 | 枚方市全域（樟葉・牧野・枚方公園・香里園・長尾・津田・藤阪） |
| 関心 | 学校/塾/習い事/医療/遊び場/防災/共働き支援 |
| 流入想定 | Google検索「枚方 小児科 夜間」等ロングテール、SNS、LINE |

## 4. 情報アーキテクチャ（IA）

### トップナビゲーション

```
ホーム
├─ 子育て・教育 (parenting)
├─ おでかけ・遊び場 (outings)
├─ グルメ (food)
├─ 医療・健康 (health)
├─ 暮らし・防災 (living)
└─ コミュニティ (community)

補助: エリア / 特集 / ツール / About / 検索
```

### カテゴリ階層（2層 + タグで横断）

**子育て・教育 `/parenting`**
- 保育・幼稚園・こども園 `/preschool`
- 小学校 `/elementary`
- 中学校 `/junior-high`
- 塾・習い事 `/lessons`
- 受験・進学 `/exam`
- 子育て支援制度 `/support`

**おでかけ・遊び場 `/outings`**
- 公園・広場 `/parks`
- 屋内施設 `/indoor`
- 季節イベント `/events`
- 無料スポット `/free`
- 雨の日 `/rainy-day`

**グルメ `/food`**
- 子連れランチ `/lunch`
- 個室・座敷 `/private-room`
- テイクアウト `/takeout`
- カフェ・スイーツ `/cafe`

**医療・健康 `/health`**
- 小児科 `/pediatrics`
- 歯科 `/dental`
- 夜間・休日救急 `/emergency`
- 予防接種・健診 `/vaccine`

**暮らし・防災 `/living`**
- 防災・ハザードマップ `/disaster`
- 防犯・通学路 `/safety`
- 買い物・スーパー `/shopping`
- 住環境 `/housing`

**コミュニティ `/community`**
- NPO・ボランティア `/volunteer`
- 地域イベント `/events`
- PTA・保護者会 `/pta`

### 横断タクソノミー（タグ）

- **エリアタグ** `/area/[slug]`: `kuzuha`（樟葉）, `makino`（牧野）, `hirakatashi`（枚方市駅）, `korien`（香里園）, `nagao`（長尾）, `tsuda`（津田）, `fujisaka`（藤阪）, `yamadaike`（山田池）
- **年齢タグ** `/tag/age-[slug]`: `age-infant`（未就学）, `age-lower-elem`（小1-3）, `age-upper-elem`（小4-6）, `age-jhs`（中学生）
- **テーマタグ** `/tag/[slug]`: `free`, `reservation`, `indoor-play`, `stroller-ok`, `allergy-friendly` 等

## 5. URL設計

### 基本方針
- 日本語URL不使用（全slug英数字kebab-case）
- trailing slash統一（`/` 付き）
- カテゴリ階層は3階層以内
- `/article/` プレフィックス不使用（SEO短縮・カテゴリ直下配置）

### URLパターン一覧

| 種別 | パターン | 例 |
|---|---|---|
| Home | `/` | `/` |
| カテゴリTOP | `/[category]/` | `/parenting/` |
| サブカテゴリ | `/[category]/[sub]/` | `/parenting/preschool/` |
| 記事 | `/[category]/[sub]/[slug]/` | `/parenting/preschool/kuzuha-hoikuen-2026/` |
| 記事（カテゴリ直下） | `/[category]/[slug]/` | `/health/yakan-kyuukyuu-matome/` |
| エリア | `/area/[slug]/` | `/area/kuzuha/` |
| タグ | `/tag/[slug]/` | `/tag/free/` |
| 特集シリーズ | `/feature/[slug]/` | `/feature/nyugaku-junbi-2026/` |
| 著者 | `/author/[slug]/` | `/author/yamada-taro/` |
| ツール | `/tools/[slug]/` | `/tools/school-map/` |
| About | `/about/` | `/about/` |
| 問合せ | `/contact/` | `/contact/` |
| ポリシー | `/privacy/` `/terms/` | |
| sitemap | `/sitemap.xml` | |
| RSS | `/rss.xml` | |
| 検索 | `/search/?q=` | |

### slug命名規則
- 英小文字 + 数字 + ハイフンのみ
- キーワード含有（例: `hirakata-shonika-matome`）
- 年号記事は `-2026` 等を末尾付与（更新時は年号差し替え）
- カテゴリslugは短く（`parenting`/`outings`/`food`/`health`/`living`/`community`）

## 6. ページテンプレート一覧

| テンプレート | 用途 |
|---|---|
| `app/page.tsx` | Home（最新記事・カテゴリカード・特集） |
| `app/[category]/page.tsx` | カテゴリインデックス |
| `app/[category]/[sub]/page.tsx` | サブカテゴリ一覧 |
| `app/[category]/[sub]/[slug]/page.tsx` | 記事詳細（構造化データ注入） |
| `app/area/page.tsx` + `[slug]/page.tsx` | エリア索引・エリア記事一覧 |
| `app/tag/[slug]/page.tsx` | タグ一覧 |
| `app/feature/[slug]/page.tsx` | 特集シリーズ |
| `app/author/[slug]/page.tsx` | 著者プロフ（E-E-A-T） |
| `app/tools/*` | 学区検索・施設マップ等インタラクティブ |
| `app/search/page.tsx` | 全文検索結果 |
| `app/about/`, `/contact/`, `/privacy/`, `/terms/` | 固定ページ |
| `app/sitemap.ts` / `robots.ts` | 動的生成 |

## 7. 記事ページの情報構造（AIEO最適化）

記事テンプレートに以下を必ず含める：

1. **H1**（検索意図キーワード含有・32字以内）
2. **リード**（結論3行／AI検索引用向け）
3. **目次（TOC）**（H2自動生成）
4. **公開日・最終更新日・著者リンク**
5. **本文**（H2/H3階層・画像alt・内部リンク）
6. **FAQ セクション**（FAQPage構造化データ）
7. **比較表 / スポット情報ボックス**（LocalBusiness構造化データ）
8. **関連記事 3〜6件**（同カテゴリ / 同エリア）
9. **CTA ブロック**（LINE登録／NPO寄付／ボランティア）
10. **パンくず**（BreadcrumbList）
11. **出典リンク**（枚方市公式等の一次情報）

## 8. SEO / AIEO 方針

### 構造化データ（JSON-LD）
- `Article` / `NewsArticle`（全記事）
- `BreadcrumbList`（全ページ）
- `FAQPage`（FAQセクション）
- `LocalBusiness` / `Place`（施設紹介記事）
- `Event`（イベント記事）
- `Organization`（サイトルート）
- `Person`（著者）

### メタ情報
- `<title>` 50-60字・キーワード前方・サイト名末尾
- `<meta description>` 120字前後
- OGP画像自動生成（Next.js `opengraph-image.tsx`）
- canonical URL・hreflang（多言語対応時）

### 内部リンク戦略
- ピラー記事（カテゴリTOP）→ クラスター記事（詳細）相互リンク
- エリアタグで地理クラスタリング
- 特集シリーズで文脈クラスタリング

### sitemap / robots
- `app/sitemap.ts` で動的生成
- 画像sitemap分離（`sitemap-images.xml`）
- robots.txtで検索除外パス指定

## 9. コンテンツ管理モデル（型定義）

```ts
// 想定型（実装時 src/lib/types.ts）
type Article = {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  subcategory?: SubcategorySlug;
  areaTags: AreaSlug[];
  ageTags: AgeSlug[];
  themeTags: string[];
  author: AuthorSlug;
  publishedAt: string;  // ISO8601
  updatedAt: string;
  heroImage: { src: string; alt: string };
  body: string;  // MDX
  faq?: { q: string; a: string }[];
  spots?: Spot[];  // LocalBusiness化
  sources: { title: string; url: string }[];
};
```

CMS候補（次フェーズ決定）：microCMS / Sanity / Contentlayer(MDX) / Notion API。

## 10. ディレクトリ構造（次フェーズ実装時）

```
npo_hirakata/
├── npo-lp/            # 既存（そのまま）
└── hirakata-kids/     # 新規メディア
    ├── src/
    │   ├── app/
    │   │   ├── (marketing)/        # home, about, contact
    │   │   ├── [category]/
    │   │   │   └── [sub]/
    │   │   │       └── [slug]/page.tsx
    │   │   ├── area/
    │   │   ├── tag/
    │   │   ├── feature/
    │   │   ├── author/
    │   │   ├── tools/
    │   │   ├── search/
    │   │   ├── sitemap.ts
    │   │   ├── robots.ts
    │   │   ├── opengraph-image.tsx
    │   │   └── layout.tsx
    │   ├── components/
    │   │   ├── article/     # ArticleHeader, TOC, FAQ, SpotCard
    │   │   ├── layout/      # Header, Footer, Breadcrumb
    │   │   ├── cards/       # ArticleCard, CategoryCard, AreaCard
    │   │   ├── cta/         # LineCTA, DonationCTA
    │   │   └── ui/          # 共通プリミティブ
    │   ├── lib/
    │   │   ├── types.ts
    │   │   ├── categories.ts
    │   │   ├── areas.ts
    │   │   ├── tags.ts
    │   │   ├── seo.ts       # 構造化データ生成ヘルパ
    │   │   └── content.ts   # CMS接続層
    │   └── styles/globals.css
    ├── public/
    ├── package.json
    └── next.config.ts
```

## 11. レビュー観点（本設計書の検証項目）

- [ ] IA（カテゴリ/サブカテゴリ/タグ）を読んで、想定記事が必ずどこかに配置できるか
- [ ] URL設計が「枚方 ○○」検索で上位表示されるキーワード構造か
- [ ] 既存LP（`npo-lp/`）との関係（ブランド独立性・相互リンク）が明確か
- [ ] 構造化データ設計がAIEO（AI検索引用）を意識できているか
- [ ] 次フェーズ（技術スタック選定／CMS選定／記事生成パイプライン実装）に進める粒度か

## 12. 次フェーズで決めること（本書の範囲外）

1. ドメイン取得・ブランド名確定
2. 技術スタック確定（CMS選定／Next.js or Astro）
3. 記事生成パイプライン（Claude API・データソース連携・合法な一次情報取得）
4. ロゴ・配色・デザインシステム
5. 著者プロフィール・監修体制（E-E-A-T）
6. アナリティクス（GA4 / Microsoft Clarity / Search Console）
7. 公開前チェックリスト（プライバシーポリシー・特定商取引法・景表法）

## 13. 参照ファイル（既存リポジトリから再利用・参考）

| ファイル | 用途 |
|---|---|
| `npo-lp/src/app/globals.css` | Tailwind v4トークン定義（配色思想の参考） |
| `npo-lp/src/app/grants/page.tsx` | カテゴリ/優先度分類の実装パターン |
| `npo-lp/src/lib/grants.ts` | データ駆動パターン（マスタ構造参考） |
| `npo-lp/AGENTS.md` | Next.js 16固有仕様への注意書き |
| `README.md` | 既存リポジトリ全体像 |
