// 動物占い（個性心理學 60パターン）計算ロジック
//
// 算出式：
//   N = (年代表[年] + 月代表[月] + 日) mod 60
//   N === 0 のときは 60 とする
//
// その N（1〜60）が 12種の動物 × 5サブタイプ = 60パターンのどれに該当
// するかを公開資料のマッピング表で引きます。
//
// 解説文は本ライブラリ独自の表現で書いており、特定書籍の引用ではあり
// ません（必要に応じて Member.customTraits で上書き可能）。

// 12種の動物
export type AnimalKind =
  | "kojika"   // こじか
  | "kuroHyou" // 黒ひょう
  | "saru"     // 猿
  | "ookami"   // 狼
  | "tanuki"   // たぬき
  | "lion"     // ライオン
  | "tora"     // 虎
  | "cheetah"  // チーター
  | "elephant" // ゾウ
  | "koala"    // 子守熊（コアラ）
  | "hitsuji"  // ひつじ
  | "pegasus"; // ペガサス

// 3グループ（MOON / EARTH / SUN）— 行動と感情のスタイル分類
export type AnimalGroup = "MOON" | "EARTH" | "SUN";

// 年代表（1925〜2030年）。各年の値（旧暦補正込み）。
// 平年は前年 + 5、閏年は前年 + 6（およそ）の周期。
const YEAR_TABLE: Record<number, number> = {
  1925: 35, 1926: 0,  1927: 5,  1928: 10, 1929: 16, 1930: 21, 1931: 26, 1932: 31,
  1933: 37, 1934: 42, 1935: 47, 1936: 52, 1937: 58, 1938: 3,  1939: 8,  1940: 13,
  1941: 19, 1942: 24, 1943: 29, 1944: 34, 1945: 40, 1946: 45, 1947: 50, 1948: 55,
  1949: 1,  1950: 6,  1951: 11, 1952: 16, 1953: 22, 1954: 27, 1955: 32, 1956: 37,
  1957: 43, 1958: 48, 1959: 53, 1960: 58, 1961: 4,  1962: 9,  1963: 14, 1964: 19,
  1965: 25, 1966: 30, 1967: 35, 1968: 40, 1969: 46, 1970: 51, 1971: 56, 1972: 1,
  1973: 7,  1974: 12, 1975: 17, 1976: 22, 1977: 28, 1978: 33, 1979: 38, 1980: 43,
  1981: 49, 1982: 54, 1983: 59, 1984: 4,  1985: 10, 1986: 15, 1987: 20, 1988: 25,
  1989: 31, 1990: 36, 1991: 41, 1992: 46, 1993: 52, 1994: 57, 1995: 2,  1996: 7,
  1997: 13, 1998: 18, 1999: 23, 2000: 28, 2001: 34, 2002: 39, 2003: 44, 2004: 49,
  2005: 55, 2006: 0,  2007: 5,  2008: 10, 2009: 16, 2010: 21, 2011: 26, 2012: 31,
  2013: 37, 2014: 42, 2015: 47, 2016: 52, 2017: 58, 2018: 3,  2019: 8,  2020: 13,
  2021: 19, 2022: 24, 2023: 29, 2024: 34, 2025: 40, 2026: 45, 2027: 50, 2028: 55,
  2029: 1,  2030: 6,
};

// 月代表（1〜12月）。閏年の1〜2月は +1 補正。
const MONTH_TABLE: Record<number, number> = {
  1: 0, 2: 31, 3: 59, 4: 30, 5: 0, 6: 31,
  7: 1, 8: 32, 9: 3, 10: 33, 11: 4, 12: 34,
};

function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

// 個性番号 = (年代表[年] + 月代表[月] + 日) mod 60、0 なら 60。
// 閏年の 1〜2 月は月の値を +1 する。
export function calcDestinyNumber(
  y: number,
  m: number,
  d: number
): number | null {
  const yv = YEAR_TABLE[y];
  if (yv === undefined) return null;
  const mvBase = MONTH_TABLE[m];
  if (mvBase === undefined) return null;
  const leapBoost = isLeapYear(y) && (m === 1 || m === 2) ? 1 : 0;
  const sum = yv + mvBase + leapBoost + d;
  const mod = sum % 60;
  return mod === 0 ? 60 : mod;
}

// 個性番号（1〜60）→ 12動物の割り当て表
// 一般に公開されている 60パターン → 動物 のマッピング。
const NUMBER_TO_ANIMAL: Record<number, AnimalKind> = {
  1: "kojika", 2: "kuroHyou", 3: "saru", 4: "ookami", 5: "tanuki",
  6: "kojika", 7: "kuroHyou", 8: "saru", 9: "ookami", 10: "tanuki",
  11: "lion", 12: "tora", 13: "cheetah", 14: "elephant", 15: "koala",
  16: "lion", 17: "tora", 18: "cheetah", 19: "elephant", 20: "koala",
  21: "hitsuji", 22: "pegasus", 23: "ookami", 24: "saru", 25: "kojika",
  26: "hitsuji", 27: "pegasus", 28: "ookami", 29: "saru", 30: "kojika",
  31: "elephant", 32: "tora", 33: "lion", 34: "kuroHyou", 35: "tanuki",
  36: "elephant", 37: "tora", 38: "lion", 39: "kuroHyou", 40: "tanuki",
  41: "koala", 42: "saru", 43: "cheetah", 44: "kojika", 45: "kuroHyou",
  46: "koala", 47: "saru", 48: "cheetah", 49: "kojika", 50: "kuroHyou",
  51: "pegasus", 52: "ookami", 53: "tanuki", 54: "lion", 55: "tora",
  56: "pegasus", 57: "ookami", 58: "tanuki", 59: "lion", 60: "tora",
};

// 各動物の基本情報（独自記述）
export const ANIMALS: Record<
  AnimalKind,
  {
    name: string;
    emoji: string;
    group: AnimalGroup;
    keywords: string[];
    description: string;
    strengths: string[];
    cautions: string[];
    suitedRoles: string[];
  }
> = {
  kojika: {
    name: "こじか",
    emoji: "🦌",
    group: "MOON",
    keywords: ["純粋", "察知力", "繊細", "信頼"],
    description:
      "観察眼が鋭く、相手の気持ちを察する力に長けたタイプ。表面的な調和よりも、信頼関係を一つひとつ丁寧に積み重ねたい。場の空気を整える縁の下の存在感があります。",
    strengths: [
      "相手の心の動きを的確に読み取る",
      "場の空気を和らげる穏やかさ",
      "信頼で結ばれた長期的な関係づくり",
    ],
    cautions: [
      "急かされる場面では本来の力が出にくい",
      "苦手な相手とは距離を保ちたいタイプ",
    ],
    suitedRoles: ["渉外・パートナーシップ", "コミュニティ運営", "サポート役"],
  },
  kuroHyou: {
    name: "黒ひょう",
    emoji: "🐆",
    group: "MOON",
    keywords: ["スマート", "感性", "ブランディング", "美意識"],
    description:
      "場の流行や雰囲気を素早く察知し、洗練された見せ方を作るのが得意。本物志向で、安易な妥協を嫌います。チームの「見え方」を一段引き上げてくれる存在。",
    strengths: [
      "美意識を発揮した表現・編集",
      "細かな違和感を逃さない感性",
      "場の雰囲気をスタイリッシュに整える",
    ],
    cautions: [
      "プライドが先に立ち本音が出にくいことも",
      "雑な扱いを受けるとモチベーションが大きく落ちる",
    ],
    suitedRoles: ["広報・ブランディング", "プロデュース", "対外プレゼン"],
  },
  saru: {
    name: "猿",
    emoji: "🐒",
    group: "EARTH",
    keywords: ["スピード", "サービス精神", "瞬発力", "場を作る"],
    description:
      "明るく機転が利き、場を盛り上げるムードメーカー。短期の集中力と現場対応力が高く、トラブルにもすばやく反応します。フットワーク重視のタイプ。",
    strengths: [
      "現場でのスピード判断",
      "人懐っこさを活かしたネットワーク作り",
      "短期決戦のプロジェクト推進",
    ],
    cautions: [
      "長期計画やじっくり型の作業は気が散りやすい",
      "気分のムラが行動に出る",
    ],
    suitedRoles: ["イベント企画・運営", "営業・現場対応", "ボランティア統括"],
  },
  ookami: {
    name: "狼",
    emoji: "🐺",
    group: "EARTH",
    keywords: ["独自性", "こだわり", "職人気質", "集中"],
    description:
      "他人と同じやり方を嫌い、自分のペースとルールを大切にするタイプ。集団に流されず、独自の手法を磨き続けることで本物の価値を作っていきます。",
    strengths: [
      "深い集中力と独自視点",
      "ルーチンを精緻に磨き上げる職人気質",
      "ぶれない自己基準",
    ],
    cautions: [
      "多人数で常に動く環境は消耗しやすい",
      "ペースを乱されることを嫌う",
    ],
    suitedRoles: ["事業設計・戦略", "資料・申請書類の作成", "研究・データ分析"],
  },
  tanuki: {
    name: "たぬき",
    emoji: "🦝",
    group: "MOON",
    keywords: ["人徳", "歴史", "懐の深さ", "落としどころ"],
    description:
      "古くからのつながりや、人と人の縁を大切にするタイプ。包容力と懐の深さで、対立しがちな関係にも落としどころを作っていきます。",
    strengths: [
      "対立を緩和する仲裁力",
      "古い関係性を活かすネットワーク",
      "長期の信頼に支えられる存在感",
    ],
    cautions: [
      "意思決定が遅れがち",
      "「断ること」が苦手で抱え込む傾向",
    ],
    suitedRoles: ["顧問・相談役", "対自治体・地縁団体との調整", "後継者育成"],
  },
  lion: {
    name: "ライオン",
    emoji: "🦁",
    group: "SUN",
    keywords: ["威厳", "リーダー", "見られ意識", "矜持"],
    description:
      "場の中心で旗を立てるリーダー型。意思決定の早さと、責任を背負う覚悟があります。「やる」と決めたことを最後まで引っ張っていく姿が頼もしいタイプ。",
    strengths: [
      "決断と方向づけ",
      "対外的なシンボル力",
      "責任を引き受ける姿勢",
    ],
    cautions: [
      "プライドが意思決定に影響する場面あり",
      "細部のフォローは仲間に委ねる必要",
    ],
    suitedRoles: ["代表・理事長", "対外メッセージ発信", "重要決裁の最終判断"],
  },
  tora: {
    name: "虎",
    emoji: "🐯",
    group: "EARTH",
    keywords: ["王道", "実直", "実力主義", "後輩思い"],
    description:
      "正攻法と実力で勝負したいタイプ。年下や後輩に対する面倒見の良さがあり、組織の中核を担う実直なリーダー。地に足の着いた強さを持ちます。",
    strengths: [
      "コツコツ積み上げる継続力",
      "後輩・新メンバーの育成",
      "ぶれない実行力",
    ],
    cautions: [
      "ショートカットや裏技を嫌う",
      "自分のやり方を曲げない頑なさが出ることも",
    ],
    suitedRoles: ["事業マネージャー", "オペレーション統括", "メンター"],
  },
  cheetah: {
    name: "チーター",
    emoji: "🐆",
    group: "SUN",
    keywords: ["瞬発力", "立ち上げ", "短期戦", "勝負勘"],
    description:
      "立ち上げ期の瞬発力と勝負勘に長けるタイプ。0→1の場面で誰よりも先に走り出し、勢いで道を切り開きます。長期戦より「いまここで決める」が得意。",
    strengths: [
      "立ち上げの推進力",
      "短期決戦での集中力",
      "勝負所での意思決定",
    ],
    cautions: [
      "気持ちが冷めると一気に手放しがち",
      "細かな運用や継続業務は不得手",
    ],
    suitedRoles: ["新規事業の立ち上げ", "イベント開催", "ピッチ・営業"],
  },
  elephant: {
    name: "ゾウ",
    emoji: "🐘",
    group: "EARTH",
    keywords: ["努力家", "誠実", "コツコツ", "信頼"],
    description:
      "地味でも確実に積み重ねる努力家タイプ。一度任されたことは最後までやり切る誠実さがあり、組織の信頼基盤になります。派手さよりも本物志向。",
    strengths: [
      "粘り強い継続力",
      "細部の正確さ",
      "一度信頼を築くと長く続く関係",
    ],
    cautions: [
      "短期の方針転換に弱い",
      "新しい人や場に慣れるのに時間が要る",
    ],
    suitedRoles: ["会計・経理", "申請書類管理", "倉庫・物流の運用"],
  },
  koala: {
    name: "子守熊（コアラ）",
    emoji: "🐨",
    group: "EARTH",
    keywords: ["合理性", "省エネ", "戦略家", "本質"],
    description:
      "感情よりロジック、量より質を重視する戦略家タイプ。少ない労力で最大の成果を出す道筋を見つけるのが上手。本質を捉えた意思決定ができます。",
    strengths: [
      "全体最適を見抜く戦略眼",
      "リソースの効率配分",
      "感情に流されない判断",
    ],
    cautions: [
      "ロジック先行で温度感が伝わりにくいことも",
      "心身が疲れた時の回復にじっくり時間が必要",
    ],
    suitedRoles: ["事業戦略・財務計画", "プロジェクトマネジメント", "助成金申請"],
  },
  hitsuji: {
    name: "ひつじ",
    emoji: "🐑",
    group: "SUN",
    keywords: ["協調", "情報通", "つなぎ役", "和"],
    description:
      "場の人間関係や情報の流れを誰よりも把握しているタイプ。橋渡し役として組織内外をつなぎ、見えない潤滑油の役を果たします。",
    strengths: [
      "情報ネットワークの形成",
      "メンバー間のつなぎ役",
      "場の温度を整える",
    ],
    cautions: [
      "一人で抱え込みすぎる傾向",
      "対立場面では巻き込まれやすい",
    ],
    suitedRoles: ["コミュニティマネジメント", "広報補佐", "内部調整・人事"],
  },
  pegasus: {
    name: "ペガサス",
    emoji: "🦄",
    group: "SUN",
    keywords: ["直感", "感性", "自由", "ひらめき"],
    description:
      "枠にとらわれない発想と、ひらめき重視の感性派タイプ。常識を飛び越えるアイデアで、組織に新風を吹き込みます。気分の波が大きいのも特徴。",
    strengths: [
      "斬新な発想とビジョン",
      "感性を活かした表現",
      "自由な視点で新しい道を開く",
    ],
    cautions: [
      "気分の波があり継続が課題になることも",
      "ルーティン業務は退屈に感じやすい",
    ],
    suitedRoles: ["クリエイティブ・デザイン", "新規事業の発案", "コンテンツ制作"],
  },
};

// 個性番号からサブタイプ（同じ動物でも5パターンに分かれる）の名称を引く
// マッピングは公開資料に基づく一般的な呼称（呼び方は表現を平易に）。
function subtypeLabelOf(animal: AnimalKind, n: number): string {
  // 同じ動物に該当する5つの番号を、登場順に1〜5番目とラベリング
  const numbersForAnimal = Object.entries(NUMBER_TO_ANIMAL)
    .filter(([, a]) => a === animal)
    .map(([k]) => Number(k))
    .sort((a, b) => a - b);
  const idx = numbersForAnimal.indexOf(n);
  const subtypeNames = ["タイプA", "タイプB", "タイプC", "タイプD", "タイプE"];
  return subtypeNames[idx] ?? "";
}

export type AnimalDiagnosis = {
  number: number;
  animal: AnimalKind;
  animalName: string;
  emoji: string;
  group: AnimalGroup;
  subtypeLabel: string;
  keywords: string[];
  description: string;
  strengths: string[];
  cautions: string[];
  suitedRoles: string[];
};

export function diagnose(birthDate: string): AnimalDiagnosis | null {
  // birthDate は "YYYY-MM-DD"
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const n = calcDestinyNumber(y, mo, d);
  if (!n) return null;
  const animal = NUMBER_TO_ANIMAL[n];
  const info = ANIMALS[animal];
  return {
    number: n,
    animal,
    animalName: info.name,
    emoji: info.emoji,
    group: info.group,
    subtypeLabel: subtypeLabelOf(animal, n),
    keywords: info.keywords,
    description: info.description,
    strengths: info.strengths,
    cautions: info.cautions,
    suitedRoles: info.suitedRoles,
  };
}
