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
