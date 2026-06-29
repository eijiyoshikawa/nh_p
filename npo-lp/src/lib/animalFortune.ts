// 動物占い（個性心理學）のメタデータ。
// noa-group.co.jp のキャラナビ診断結果（11名分）をそのまま保持する形に
// 切り替えたため、生年月日からの計算ロジックは廃止し、各メンバーに
// 個別の AnimalCharacter を持たせる方針。

export type AnimalGroup = "MOON" | "EARTH" | "SUN";

// 12種のベース動物
export type BaseAnimal =
  | "kojika"   // こじか
  | "kuroHyou" // 黒ひょう
  | "saru"     // 猿
  | "ookami"   // 狼
  | "tanuki"   // たぬき
  | "lion"     // ライオン
  | "tora"     // 虎
  | "cheetah"  // チータ
  | "elephant" // ゾウ
  | "koala"    // 子守熊（コアラ）
  | "hitsuji"  // ひつじ
  | "pegasus"; // ペガサス

// 心理ベクトル：時間軸の感覚
export type CharacterVector = "未来展望型" | "過去回想型";
// 行動パターン：意思決定の駆動軸
export type BehaviorPattern = "目標指向型" | "状況対応型";
// 思考パターン：思考処理のスタイル
export type ThinkingPattern = "左脳型" | "右脳型";

// 各ベース動物のグループ・絵文字・共通性格（グループ全員共通の素質）
export const BASE_ANIMALS: Record<
  BaseAnimal,
  {
    name: string;
    emoji: string;
    group: AnimalGroup;
    commonTraits: string[];
  }
> = {
  kojika: {
    name: "こじか",
    emoji: "🦌",
    group: "MOON",
    commonTraits: [
      "人見知りだが慣れると甘える",
      "目上の人に好かれる",
      "純粋で素直",
      "急かされるのが苦手",
    ],
  },
  kuroHyou: {
    name: "黒ひょう",
    emoji: "🐈‍⬛",
    group: "MOON",
    commonTraits: [
      "新しいモノが好き",
      "カッコよくスマートにリードしたい",
      "黒＆白が好き",
      "正義感が強い",
      "思わぬ障害があると弱い",
      "傷つきやすい",
      "先行逃げ切り型",
    ],
  },
  saru: {
    name: "猿",
    emoji: "🐒",
    group: "EARTH",
    commonTraits: [
      "落ち着きがない",
      "手先が器用",
      "堅苦しい雰囲気が苦手",
      "ほめられたいために頑張る",
      "何事も短期決戦",
      "勝ち負けにこだわる",
      "細かく指示されないとダメ",
    ],
  },
  ookami: {
    name: "狼",
    emoji: "🐺",
    group: "EARTH",
    commonTraits: [
      "ペースを乱されるのを嫌う",
      "一人だけの時間と空間が好き",
      "人まねをしたくない",
      "初対面ではとっつきにくい",
      "臨機応変の対応が苦手",
      "言葉足らずのところがある",
      "「変わってるね」と言われると喜ぶ",
    ],
  },
  tanuki: {
    name: "たぬき",
    emoji: "🦝",
    group: "MOON",
    commonTraits: [
      "古いモノにこだわる",
      "何事も経験と実績",
      "他のキャラクターにもなれる",
      "年配の人からかわいがられる",
      "人間関係のために生きている",
      "行きつけの店を持つのが好き",
    ],
  },
  lion: {
    name: "ライオン",
    emoji: "🦁",
    group: "SUN",
    commonTraits: [
      "王様扱い、VIP待遇に弱い",
      "弱音を吐かない",
      "礼儀礼節にうるさい",
      "世間体を気にする",
      "教え方が厳しい",
      "自分に優しく、他人に厳しい",
      "甘えん坊で親父ギャグが好き",
    ],
  },
  tora: {
    name: "虎",
    emoji: "🐯",
    group: "EARTH",
    commonTraits: [
      "正攻法で勝負したい",
      "面倒見が良い",
      "実力主義",
      "後輩から慕われる",
    ],
  },
  cheetah: {
    name: "チータ",
    emoji: "🐆",
    group: "SUN",
    commonTraits: [
      "超プラス思考",
      "小さなことには興味がない",
      "瞬発力はあるが長続きしない",
      "常に大ぜいの中心でいたい",
      "欲しいと思ったらすぐ買う",
      "話も態度も大きい",
      "焼き肉が好き",
    ],
  },
  elephant: {
    name: "ゾウ",
    emoji: "🐘",
    group: "EARTH",
    commonTraits: [
      "コツコツ積み上げる努力家",
      "誠実で粘り強い",
      "信頼を積み上げる",
      "一度決めた道を最後まで進む",
    ],
  },
  koala: {
    name: "子守熊",
    emoji: "🐨",
    group: "EARTH",
    commonTraits: [
      "ボーッとしている時間が好き",
      "ロマンティストな空想家",
      "南の島や温泉が好き",
      "サービス精神が旺盛",
      "昼寝が好きで、夜は強い",
      "負ける勝負はしない",
      "下ネタOK!",
    ],
  },
  hitsuji: {
    name: "ひつじ",
    emoji: "🐑",
    group: "MOON",
    commonTraits: [
      "寂しがり屋で一人ぼっちが嫌い",
      "仲間外れにされたくない",
      "「和」を大切にする",
      "情報収集家",
      "お金を貯めるのが好き",
      "誘われると断れない",
      "グチ、ぼやきが多い",
    ],
  },
  pegasus: {
    name: "ペガサス",
    emoji: "🦄",
    group: "SUN",
    commonTraits: [
      "ひらめき重視",
      "気分の波がある",
      "枠にとらわれない発想",
      "感性で動く",
    ],
  },
};

// 個別キャラクター情報（noa-group の診断結果をそのまま保持）
export type AnimalCharacter = {
  // 形容詞付き正式名称（例：「情熱的な黒ひょう」）
  fullName: string;
  // ベース動物（12種）
  base: BaseAnimal;
  // 個別キャラクターの説明文（noa-group の本文をそのまま）
  description?: string;
  // 心理ベクトル
  characterVector: CharacterVector;
  // 行動パターン
  behaviorPattern: BehaviorPattern;
  // 思考パターン
  thinkingPattern: ThinkingPattern;
};

// 3グループの説明（表示用）
export const GROUP_INFO: Record<AnimalGroup, { label: string; sub: string; tone: string }> = {
  MOON: {
    label: "MOON",
    sub: "いい人・全体の和を重視",
    tone: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  EARTH: {
    label: "EARTH",
    sub: "しっかり者・結果重視",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  SUN: {
    label: "SUN",
    sub: "天才肌・直感重視",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
  },
};
