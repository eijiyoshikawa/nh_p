import type { PlanEntry } from "./topic-types";

// A deterministic, API-free fallback body. Produces a scaffolded draft
// article the editor can flesh out by hand. This is what `npm run batch`
// emits when run with --template (no Claude API calls).
//
// The draft intentionally contains "TODO" markers so the content cannot
// be mistaken for publish-ready copy after the `draft: true` flag is
// flipped off.
export function buildTemplateBody(entry: PlanEntry): string {
  const anglePrompt =
    {
      guide: "この記事では、保護者が迷わず動けるように手順と判断軸を示します。",
      list: "この記事では、候補を比較しやすいよう観点ごとに整理します。",
      faq: "この記事では、保護者がよく持つ疑問に答えるQ&A中心の構成です。",
      column: "この記事では、地域の視点でトピックを少し広めに眺めます。",
    }[entry.angle ?? "guide"];

  const areaLine = entry.areaTags.length
    ? `- 対象エリア: ${entry.areaTags.join(" / ")}`
    : "";
  const ageLine = entry.ageTags.length
    ? `- 対象年齢層: ${entry.ageTags.join(" / ")}`
    : "";
  const sourceLines = entry.sources.length
    ? entry.sources.map((s) => `- ${s}`).join("\n")
    : "- TODO: 一次情報の出典URLを追記";

  return `## はじめに

${entry.description}

${anglePrompt}

${[areaLine, ageLine].filter(Boolean).join("\n")}

## 背景

TODO: 執筆者が、枚方市におけるこのテーマの背景・現状を2〜3段落でまとめる。

## 押さえたいポイント

- TODO: 観点1
- TODO: 観点2
- TODO: 観点3

## 行動プラン

1. TODO: ステップ1
2. TODO: ステップ2
3. TODO: ステップ3

## 注意点・よくある落とし穴

- TODO: 保護者が陥りがちな誤解
- TODO: 時期・制度の変更に注意

## よくある質問

### Q. TODO: よくある質問1
TODO: 回答

### Q. TODO: よくある質問2
TODO: 回答

## 参考資料

${sourceLines}

## まとめ

TODO: 記事のまとめを3〜5文で。
`;
}
