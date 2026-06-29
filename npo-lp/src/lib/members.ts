import { diagnose, type AnimalDiagnosis, type AnimalGroup, ANIMALS } from "./animalFortune";

// 自己申告の意思決定軸（Google Form 回答より）。動物占いの計算結果と
// 一致しない場合は、本人の自己申告（authoritative）を優先表示する。
export type Member = {
  slug: string;
  name: string;
  furigana: string;
  birthDate: string; // YYYY-MM-DD
  occupation: string;
  hobby: string;
  motto: string;
  motivation: string;
  strengths: string; // 自由記述（得意なこと・やりたいこと）
  selfReportedGroup: AnimalGroup; // 自己申告 MOON / EARTH / SUN
};

export const members: Member[] = [
  {
    slug: "yoshikawa-eiji",
    name: "吉川 英治",
    furigana: "ヨシカワ エイジ",
    birthDate: "1994-07-20",
    occupation: "会社役員",
    hobby: "お酒・タバコ・旅行",
    motto: "己欲達而達人",
    motivation:
      "貴田さんに誘ってもらい、JETさんの想いを聞き自分も何か力になりたいと思ったから",
    strengths:
      "NPOなどの法人立ち上げ経験が複数回あるので、実経験を踏まえてサポートすることが得意です。",
    selfReportedGroup: "EARTH",
  },
  {
    slug: "kida-kohei",
    name: "貴田 浩平",
    furigana: "キダ コウヘイ",
    birthDate: "1995-01-12",
    occupation: "生命保険募集人",
    hobby:
      "少林寺拳法・スノーボード・キャンプ・ラーメン屋巡り・カフェ巡り・お酒・料理・車いじり・神社参拝",
    motto: "一番になったものは一番で居続けないといけない。",
    motivation:
      "はじめはおもしろそう！話を聞いてるうちに代表のアツい思いに心打たれて！",
    strengths:
      "動くこと！人に会って話す。めちゃくちゃ人に会う。逆に止まったり、ゆっくり考えるとかが苦手。",
    selfReportedGroup: "SUN",
  },
  {
    slug: "taketani-takayuki",
    name: "竹谷 孝之",
    furigana: "タケタニ タカユキ",
    birthDate: "1976-07-12",
    occupation: "飲食業",
    hobby: "釣り",
    motto: "情けは人のためならず",
    motivation: "世の中変えれそうな気がするから",
    strengths: "みんなでBBQ",
    selfReportedGroup: "MOON",
  },
  {
    slug: "gohara-hiromi",
    name: "郷原 浩美",
    furigana: "ゴウハラ ヒロミ",
    birthDate: "1978-10-02",
    occupation: "看護師",
    hobby: "メダカの飼育",
    motto: "十人十色",
    motivation: "面白いと思ったから",
    strengths: "バランスをとること",
    selfReportedGroup: "EARTH",
  },
  {
    slug: "kitada-megumi",
    name: "北田 愛",
    furigana: "キタダ メグミ",
    birthDate: "1991-08-25",
    occupation: "編集者",
    hobby: "読書・旅・ワイン・バドミントン・サックス",
    motto: "おごらず 人と比べず 面白がって 平気に生きればいい",
    motivation:
      "地元である枚方の子どもたちが、より良い環境の中で成長できることを願ってます。",
    strengths:
      "ことづくり（ブランディング、コンセプトメイキング、プランニング）／子どもたちとワークショップ／メディアコミュニケーションを活用した持続する人間関係と地域らしさづくり",
    selfReportedGroup: "MOON",
  },
  {
    slug: "tanaka-shintaro",
    name: "田中 慎太郎",
    furigana: "タナカ シンタロウ",
    birthDate: "1982-05-28",
    occupation: "営業職",
    hobby: "サッカー・サウナ・子育て",
    motto: "気は心",
    motivation: "ジェット君のキラキラした瞳を見て",
    strengths: "広報活動とか",
    selfReportedGroup: "SUN",
  },
  {
    slug: "kitano-shingo",
    name: "北野 慎吾",
    furigana: "キタノ シンゴ",
    birthDate: "1987-03-25",
    occupation: "枚方寝屋川消防",
    hobby: "釣り・ソフトボール",
    motto: "四十にして惑わず。",
    motivation: "子ども達の未来のため",
    strengths: "たくさんの人と繋がれたらな〜と思います。",
    selfReportedGroup: "MOON",
  },
  {
    slug: "hasegawa-hiroaki",
    name: "長谷川 大晃",
    furigana: "ハセガワ ヒロアキ",
    birthDate: "1999-02-20",
    occupation: "自営業",
    hobby: "なし（飲酒・友情）",
    motto: "犬も歩けば棒に当たる",
    motivation: "ジェットのスター性",
    strengths: "人の話を聞くこと",
    selfReportedGroup: "SUN",
  },
  {
    slug: "takushima-hiroaki",
    name: "宅島 陽光",
    furigana: "タクシマ ヒロアキ",
    birthDate: "1981-07-13",
    occupation: "飲食業",
    hobby: "ゴルフ・映画・音楽・漫画",
    motto: "なる様になる",
    motivation: "ジェットさん",
    strengths: "人脈は多め",
    selfReportedGroup: "MOON",
  },
  {
    slug: "hasegawa-naomi",
    name: "長谷川 尚美",
    furigana: "ハセガワ ナオミ",
    birthDate: "1972-11-04",
    occupation: "会社員",
    hobby: "オペラ鑑賞・料理・映画鑑賞",
    motto: "泥より出でて泥に染まらず",
    motivation: "未来を担う子どもたちの後押しをしたい！",
    strengths: "人を褒める事。何でもやりたい。",
    selfReportedGroup: "MOON",
  },
  {
    slug: "miki-honami",
    name: "三木 穂奈美",
    furigana: "ミキ ホナミ",
    birthDate: "1987-12-31",
    occupation: "ピラティスインストラクター",
    hobby: "猫・海水魚・海水浴",
    motto: "継続は力なり",
    motivation:
      "近年、トレーニングを通して子供の体の衰弱が目立っており、そこにはバランスの良い食事、家庭環境がとても大きく関わっているので参加させていただきたいと思いました。",
    strengths: "子供達への身体を動かすトレーニング",
    selfReportedGroup: "MOON",
  },
];

export function getMember(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}

// 動物占い計算結果（計算式に基づくベスト推定）
export function diagnosisFor(member: Member): AnimalDiagnosis | null {
  return diagnose(member.birthDate);
}

// 自己申告グループ vs 計算グループの整合
export function groupAgreement(member: Member): "match" | "mismatch" | "unknown" {
  const dx = diagnosisFor(member);
  if (!dx) return "unknown";
  return dx.group === member.selfReportedGroup ? "match" : "mismatch";
}

// グループの説明（自己申告で使用）
export const GROUP_LABELS: Record<AnimalGroup, { label: string; sub: string; tone: string }> = {
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

// 組織全体のグループ分布（自己申告ベース）
export function groupDistribution() {
  const out: Record<AnimalGroup, number> = { MOON: 0, EARTH: 0, SUN: 0 };
  for (const m of members) out[m.selfReportedGroup] += 1;
  return out;
}

// 組織全体の動物分布（計算ベース）
export function animalDistribution() {
  const out: Record<string, { count: number; name: string; emoji: string }> = {};
  for (const m of members) {
    const dx = diagnosisFor(m);
    if (!dx) continue;
    const key = dx.animal;
    if (!out[key]) {
      out[key] = { count: 0, name: dx.animalName, emoji: dx.emoji };
    }
    out[key].count += 1;
  }
  return out;
}

export { ANIMALS };
