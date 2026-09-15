// サイン検知：本文をキーワード辞書に通してタグと緊急度を付ける。
// 「見落とし防止の目印」であり、最終判断は必ず大人が行う。
// 辞書は配列を編集するだけで増減できる。

import type { Category, Tag, Urgency } from "./types";

type Rule = { tag: Tag; urgency: Urgency; words: string[] };

// 全角/半角・ひらがな/カタカナの差を吸収するため、照合前に正規化する
export function normalize(s: string): string {
  return s
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[ァ-ン]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60)) // カタカナ→ひらがな
    .replace(/[\s　、。,.!！?？「」『』()（）]/g, "");
}

export const RULES: Rule[] = [
  {
    tag: "self-harm",
    urgency: "urgent",
    words: [
      "しにたい", "死にたい", "きえたい", "消えたい", "いなくなりたい", "じさつ", "自殺",
      "りすか", "リスカ", "てくび", "手首", "きりたい", "切りたい", "生きてる意味", "いきてるいみ",
      "しんでもいい", "死んでもいい", "とびおり", "飛び降り", "くびをつ", "首をつ", "おーでぃー", "od",
    ],
  },
  {
    tag: "abuse",
    urgency: "urgent",
    words: [
      "なぐられ", "殴られ", "たたかれ", "叩かれ", "けられ", "蹴られ", "ぼうりょく", "暴力",
      "ぎゃくたい", "虐待", "ごはんがない", "ごはんをもらえ", "ごはんぬき", "ご飯抜き", "ごはん抜き",
      "いえにかえりたくない", "家に帰りたくない", "さわられ", "触られ", "ぬがされ", "脱がされ",
      "とじこめ", "閉じ込め", "しめだされ", "締め出され", "おかあさんがこわい", "おとうさんがこわい",
      "お母さんが怖い", "お父さんが怖い", "あざ", "けが", "怪我",
    ],
  },
  {
    tag: "bullying",
    urgency: "watch",
    words: [
      "いじめ", "イジメ", "むしされ", "無視され", "なかまはずれ", "仲間はずれ", "仲間外れ", "はぶかれ",
      "わるぐち", "悪口", "ものをかくされ", "物を隠され", "かくされ", "隠され", "からかわれ",
      "ばかにされ", "バカにされ", "馬鹿にされ", "おされ", "押され", "こわされ", "壊され",
      "らいんでわるぐち", "lineで悪口", "ぐるーぷをぬかされ", "グループを抜かされ", "しゅうだんで",
      "集団で", "みんなにわらわれ", "みんなに笑われ", "きもいといわれ", "しねといわれ", "死ねと言われ",
      "おかねをとられ", "お金を取られ", "おかねをとられ", "ぱしり", "パシリ",
    ],
  },
  {
    tag: "school-refusal",
    urgency: "watch",
    words: [
      "がっこうにいきたくない", "学校に行きたくない", "がっこういきたくない", "学校行きたくない",
      "がっこうがこわい", "学校が怖い", "きょうしつにはいれない", "教室に入れない", "やすみたい", "休みたい",
      "あさおなかがいたい", "朝おなかが痛い", "朝お腹が痛い", "あさになるとつらい", "朝になるとつらい",
      "ふとうこう", "不登校", "がっこうにいけない", "学校に行けない", "ほけんしつ", "保健室",
      "がっこうがいや", "学校がいや", "学校が嫌", "いきたくない",
    ],
  },
  {
    tag: "isolation",
    urgency: "watch",
    words: [
      "ひとりぼっち", "一人ぼっち", "ともだちがいない", "友だちがいない", "友達がいない", "はなせるひとがいない",
      "話せる人がいない", "さびしい", "寂しい", "ふあん", "不安", "ねむれない", "眠れない", "こわい", "怖い",
      "だれもわかってくれない", "誰も分かってくれない", "そうだんできない", "相談できない", "つらい", "辛い",
    ],
  },
  {
    tag: "family-hardship",
    urgency: "watch",
    words: [
      "おかねがない", "お金がない", "ごはんがすくない", "ごはんが少ない", "ご飯が少ない", "おなかがすく",
      "お腹がすく", "おやがけんか", "親がケンカ", "親が喧嘩", "りこん", "離婚", "おせわをして", "お世話をして",
      "かんびょう", "看病", "きょうだいのめんどう", "きょうだいの面倒", "いえのしごと", "家の仕事",
      "べんきょうするじかんがない", "勉強する時間がない", "おかあさんがいない", "おとうさんがいない",
    ],
  },
  {
    tag: "teacher",
    urgency: "normal",
    words: [
      "せんせいがこわい", "先生が怖い", "せんせいにおこられ", "先生に怒られ", "えこひいき", "せんせいがきらい",
      "先生が嫌い", "せんせいにいわれ", "先生に言われ",
    ],
  },
  {
    tag: "wish",
    urgency: "normal",
    words: ["あったらいいな", "ほしい", "欲しい", "やりたい", "してほしい", "して欲しい", "つくってほしい", "作ってほしい"],
  },
];

const URGENCY_RANK: Record<Urgency, number> = { normal: 0, watch: 1, urgent: 2 };

export const CATEGORY_TAG: Partial<Record<Category, Tag>> = {
  wish: "wish",
};

export function classify(body: string, category: Category): { tags: Tag[]; urgency: Urgency } {
  const text = normalize(body);
  const tags = new Set<Tag>();
  let urgency: Urgency = "normal";

  for (const rule of RULES) {
    if (rule.words.some((w) => text.includes(normalize(w)))) {
      tags.add(rule.tag);
      if (URGENCY_RANK[rule.urgency] > URGENCY_RANK[urgency]) urgency = rule.urgency;
    }
  }
  const ct = CATEGORY_TAG[category];
  if (ct) tags.add(ct);

  // URL が多い／同じ文字の繰り返しは迷惑投稿の可能性
  const urls = (body.match(/https?:\/\//g) ?? []).length;
  if (urls >= 2 || /(.)\1{15,}/.test(body)) tags.add("spam");

  return { tags: [...tags], urgency };
}

export const TAG_LABEL: Record<Tag, string> = {
  "self-harm": "自傷・希死念慮",
  abuse: "虐待・家庭内暴力",
  bullying: "いじめ",
  "school-refusal": "不登校・行きしぶり",
  isolation: "孤立・不安",
  "family-hardship": "家庭の困りごと",
  teacher: "先生との関係",
  wish: "希望・提案",
  spam: "要確認（迷惑投稿？）",
};

export const URGENCY_LABEL: Record<Urgency, string> = {
  urgent: "緊急",
  watch: "要注意",
  normal: "通常",
};
