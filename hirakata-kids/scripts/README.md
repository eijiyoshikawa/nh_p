# scripts/ — 記事生成パイプライン

## 概要

Claude API（`@anthropic-ai/sdk`, モデル: `claude-opus-4-7`）を用いて、一次情報ベースの記事MDXドラフトを生成するCLIです。

- **生成記事は必ず `draft: true` 付き** → 人間レビュー後に手動で公開
- **他メディアの転載禁止**：参照URLは `scripts/lib/sources.ts` の公式・オープンデータのみ使用
- **プロンプトキャッシュ適用**：システムプロンプトをキャッシュして量産時のコストを最小化
- **adaptive thinking ＋ streaming**：長文出力の安定化

## セットアップ

```bash
# ルートディレクトリで
export ANTHROPIC_API_KEY=sk-ant-...
npm install
```

## 使用例

```bash
npm run generate -- \
  --slug=yamadaike-parking-guide \
  --category=outings \
  --sub=parks \
  --title="山田池公園の駐車場ガイド【2026年版】" \
  --description="山田池公園の駐車場の場所・料金・混雑時間帯を親世代向けにまとめ。" \
  --area=yamadaike \
  --age=age-infant,age-lower-elem \
  --theme=weekend,stroller-ok \
  --source=https://www.city.hirakata.osaka.jp/ \
  --source=https://www.osaka-park.or.jp/rinkai/yamadaike/
```

出力先: `content/articles/<slug>.mdx`

## 引数仕様

| 引数 | 必須 | 例 | 説明 |
|---|---|---|---|
| `--slug` | ✅ | `yamadaike-parking` | 英数字kebab-case。URLに反映 |
| `--category` | ✅ | `outings` | `src/lib/categories.ts` 準拠 |
| `--sub` | ❌ | `parks` | サブカテゴリslug |
| `--title` | ✅ | `"..."` | 32字以内推奨 |
| `--description` | ✅ | `"..."` | 80〜120字 |
| `--area` | ❌ | `yamadaike,kuzuha` | カンマ区切り |
| `--age` | ❌ | `age-infant,age-lower-elem` | カンマ区切り |
| `--theme` | ❌ | `free,weekend` | カンマ区切り |
| `--source` | 任意複数 | `--source=<URL>` | 繰り返し指定可 |
| `--author` | ❌ | `"HIRAKIDS編集部"` | デフォルトあり |

## 出力後の手順

1. 生成された `.mdx` の内容を精読
2. 事実誤認・誇張表現がないか確認
3. ソースURLが正しく引用されているか確認
4. 必要に応じて加筆修正
5. `draft: true` の行を削除（または `false` に変更）
6. `npm run dev` でプレビュー → コミット

## 参照ソース登録

新しい公式・オープンデータソースを追加したい場合は `scripts/lib/sources.ts` の `officialSources` に追記。商用メディアは登録禁止。

## コスト目安

- `claude-opus-4-7`: $5 / 1M input, $25 / 1M output
- 1記事あたり推定：input 8K〜15K（主に参照資料）、output 2K〜4K
- 初回リクエスト: 約 $0.05〜0.15
- 2回目以降（システムプロンプトがキャッシュヒット）：input の大部分が 0.1× に → **約30〜50%のコスト削減**

キャッシュヒット率は `[generate] tokens: ... cache_read=...` のログで確認。

---

## 量産パイプライン（plan-topics + generate-batch）

1記事ずつ CLI で引数を渡すのではなく、日毎の公開日を割り当てた `plan.json` を作り、そこから一括で MDX ドラフトを書き出すためのパイプラインです。

### 構成

```
scripts/
├── lib/
│   ├── topic-types.ts     # TopicSeed / PlanEntry / Plan 型定義
│   ├── seeds/             # カテゴリ別の seed（parenting, outings, food, health, living, community）
│   ├── expand-seeds.ts    # seed → Candidate 展開（universal / per-area / monthly）
│   ├── date-planner.ts    # Candidate[] × dates → PlanEntry[]（シード固定で再現可）
│   ├── frontmatter.ts     # PlanEntry → YAML frontmatter
│   ├── body-template.ts   # Claude 不要のテンプレート本文（TODO 付き）
│   └── claude-body.ts     # Claude 呼び出しラッパー（generate-article.ts と同じモデル）
├── plan-topics.ts         # plan.json を生成する CLI
└── generate-batch.ts      # plan.json を読んで MDX を書き出す CLI
```

### ステップ 1：プランを生成する

```bash
# デフォルト：2025-02-01 〜 今日まで、1日1件
npm run plan

# 範囲を指定
npm run plan -- --from=2025-02-01 --to=2026-04-18

# 実際には書き出さず最初の10件を見るだけ
npm run plan -- --from=2025-02-01 --dry-run
```

`scripts/plan.json`（gitignore 対象）に `{ createdAt, from, to, entries[] }` が書かれます。`seed=` を変えると割当が変わる一方、同じ `seed` を渡せば再現可能です。

### ステップ 2：ドラフトを生成する

```bash
# API 不要：TODO つきのテンプレ本文で全件ドラフト生成
npm run batch -- --template

# Claude API を使って本文を生成（ANTHROPIC_API_KEY が必要）
npm run batch

# 最初の20件だけ
npm run batch -- --template --limit=20

# 日付で絞る
npm run batch -- --template --from-date=2025-04-01 --to-date=2025-12-31

# 書き出さずに対象を確認
npm run batch -- --template --dry-run
```

動作ルール：

- すでに `content/articles/<slug>.mdx` が存在すれば自動スキップ（resume-safe）
- 生成されるドラフトは `draft: true` なので、レビュー後に手動で外すまでサイト側には表示されません（`src/lib/content.ts` が draft を除外）
- Claude モードは `scripts/lib/prompts.ts` と `scripts/lib/sources.ts` を共通利用し、`claude-opus-4-7` にプロンプトキャッシュで投げます

### ステップ 3：レビューして公開

1. 生成された MDX を精読し、TODO / 参考資料・出典を確認
2. 誤情報・誇張表現を削除
3. frontmatter の `draft: true` を外す（または `false` に変更）
4. 必要に応じてタイトル・description を調整
5. `npm run dev` でローカル確認 → コミット

### 量産時のコスト目安（Claude モード）

- 1記事あたり：input 5K〜12K、output 2K〜4K
- 442件分の概算：2〜4時間、$10〜$40（モデルおよびソース資料の長さに依存）
- プロンプトキャッシュでシステム部はほぼ 0.1× になるため、--delay=500 程度でも総コストはかなり抑えられます

### seed を増やす

`scripts/lib/seeds/<category>.ts` に `TopicSeed` を追加し、`scripts/lib/seeds/index.ts` の `allSeeds` に行が入っていることを確認してから `npm run plan` で再割当します。`kind: "per-area"` の seed は自動的に 8 エリア分に展開されます。
