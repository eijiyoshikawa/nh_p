import type {
  AnimalCharacter,
  AnimalGroup,
  BaseAnimal,
} from "./animalFortune";
import { BASE_ANIMALS, GROUP_INFO } from "./animalFortune";

// 自己申告の意思決定軸（Google Form 回答より）と、
// noa-group.co.jp/kosei の動物占い診断結果（11名分）を保持する。
//
// 動物占いの結果（character）は noa-group の表示をそのまま転載。
// 自己申告（selfReportedGroup）と動物占いのグループが食い違うことが
// 一定数あるが、これは「本人がどう振る舞いたいか／実際の素質はどうか」
// の差。両方を比較できるよう表示する。
export type Member = {
  slug: string;
  name: string;
  furigana: string;
  birthDate: string; // YYYY-MM-DD
  occupation: string;
  hobby: string;
  motto: string;
  motivation: string;
  strengths: string;
  selfReportedGroup: AnimalGroup;
  character: AnimalCharacter;
};

export const members: Member[] = [
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
    character: {
      fullName: "社交家のたぬき",
      base: "tanuki",
      description:
        "老舗や伝統という言葉に弱く、見かけ倒しのかっこ良さには一切興味なし。堅実主義を徹底しすぎると柔軟さに欠け折角のチャンスを逃すことも。頼まれ事には真剣に取り組む誠実さで人脈を広げると、社会的成功の基盤に。忙しいのに成果が上がらないが、粘り強さでやり遂げれば大丈夫。精神的向上を心がければ、晩年に幸運が。",
      characterVector: "過去回想型",
      behaviorPattern: "状況対応型",
      thinkingPattern: "左脳型",
    },
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
    character: {
      fullName: "気分屋の猿",
      base: "saru",
      characterVector: "未来展望型",
      behaviorPattern: "目標指向型",
      thinkingPattern: "左脳型",
    },
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
    character: {
      fullName: "フットワークの軽い子守熊",
      base: "koala",
      characterVector: "過去回想型",
      behaviorPattern: "目標指向型",
      thinkingPattern: "右脳型",
    },
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
    character: {
      fullName: "母性豊かな子守熊",
      base: "koala",
      description:
        "障害があってもくじけず高いハードルにも果敢にチャレンジ。動と静が効果的に働くタイプ。粘り強さと頭の良さから先を見通し長期的展望で仕事をこなし、夢や理想に向かって長期的な努力をする。天性の勘を頼りに生きているため良い時と悪い時の差が激しい。テキパキやっても、気が付くと一人で意固地になる可能性も。",
      characterVector: "過去回想型",
      behaviorPattern: "目標指向型",
      thinkingPattern: "右脳型",
    },
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
    character: {
      fullName: "母性豊かな子守熊",
      base: "koala",
      description:
        "障害があってもくじけず高いハードルにも果敢にチャレンジ。動と静が効果的に働くタイプ。粘り強さと頭の良さから先を見通し長期的展望で仕事をこなし、夢や理想に向かって長期的な努力をする。天性の勘を頼りに生きているため良い時と悪い時の差が激しい。テキパキやっても、気が付くと一人で意固地になる可能性も。",
      characterVector: "過去回想型",
      behaviorPattern: "目標指向型",
      thinkingPattern: "右脳型",
    },
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
    character: {
      fullName: "尽くす猿",
      base: "saru",
      description:
        "社交的で完璧な気遣いを見せる。周囲の人とトラブルを避けるため、感情を表に出さず合理的に割り切れる大人。冷静な頭脳と鋭い感受性を内に秘め、わずかなことから相手の気持ちを的確に読み取る。独立心旺盛でタイミングを図りながら自分の人生を切り拓く。能力に自信があり何事も人任せに出来ないところは注意が必要。",
      characterVector: "未来展望型",
      behaviorPattern: "目標指向型",
      thinkingPattern: "左脳型",
    },
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
    character: {
      fullName: "チャレンジ精神の旺盛なひつじ",
      base: "hitsuji",
      description:
        "孤立を嫌い集団の中で生きることで安心する。周りと同じような生き方をしてお互いに助け合うことを望み、個性的な生き方は少し苦手。人と一定の距離を保ち相手を立てながらその心理を見抜く天才。いつの間にか自分のペースに持っていく駆け引きも大得意。世の中の動きにはとても敏感。結論を時の流れに任せる傾向あり。",
      characterVector: "過去回想型",
      behaviorPattern: "目標指向型",
      thinkingPattern: "右脳型",
    },
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
    character: {
      fullName: "好感のもたれる狼",
      base: "ookami",
      characterVector: "未来展望型",
      behaviorPattern: "目標指向型",
      thinkingPattern: "右脳型",
    },
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
    character: {
      fullName: "我が道を行くライオン",
      base: "lion",
      characterVector: "過去回想型",
      behaviorPattern: "状況対応型",
      thinkingPattern: "左脳型",
    },
  },
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
    character: {
      fullName: "情熱的な黒ひょう",
      base: "kuroHyou",
      description:
        "相手に心を開かせる気さくさが魅力。意見を正直に言っても人に威圧感を与えないが実は鋭い感性の持ち主で好き嫌いがはっきりしている。感情にムラがあり、お天気屋なため現実と理想のギャップに悩む。周囲の人から引き立てられ、苦境を打開できる幸運の持ち主。プライドは高く、人の面倒を見ることが成功への秘訣。",
      characterVector: "未来展望型",
      behaviorPattern: "目標指向型",
      thinkingPattern: "左脳型",
    },
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
    character: {
      fullName: "尽くす猿",
      base: "saru",
      description:
        "社交的で完璧な気遣いを見せる。周囲の人とトラブルを避けるため、感情を表に出さず合理的に割り切れる大人。冷静な頭脳と鋭い感受性を内に秘め、わずかなことから相手の気持ちを的確に読み取る。独立心旺盛でタイミングを図りながら自分の人生を切り拓く。能力に自信があり何事も人任せに出来ないところは注意が必要。",
      characterVector: "未来展望型",
      behaviorPattern: "目標指向型",
      thinkingPattern: "左脳型",
    },
  },
];

export function getMember(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}

// 動物占いの計算上のグループ（base から導出）
export function calculatedGroupOf(member: Member): AnimalGroup {
  return BASE_ANIMALS[member.character.base].group;
}

// 自己申告と動物占いのグループが一致しているかどうか
export function groupAgreement(member: Member): "match" | "mismatch" {
  return calculatedGroupOf(member) === member.selfReportedGroup
    ? "match"
    : "mismatch";
}

// 組織全体のグループ分布（自己申告ベース）
export function groupDistribution() {
  const out: Record<AnimalGroup, number> = { MOON: 0, EARTH: 0, SUN: 0 };
  for (const m of members) out[m.selfReportedGroup] += 1;
  return out;
}

// 組織全体の動物分布（動物占い結果ベース、ベース動物で集計）
export function animalDistribution(): Array<{
  base: BaseAnimal;
  name: string;
  emoji: string;
  count: number;
  members: string[];
}> {
  const map = new Map<
    BaseAnimal,
    { name: string; emoji: string; count: number; members: string[] }
  >();
  for (const m of members) {
    const base = m.character.base;
    const info = BASE_ANIMALS[base];
    const entry = map.get(base) ?? {
      name: info.name,
      emoji: info.emoji,
      count: 0,
      members: [],
    };
    entry.count += 1;
    entry.members.push(m.name);
    map.set(base, entry);
  }
  return Array.from(map.entries())
    .map(([base, v]) => ({ base, ...v }))
    .sort((a, b) => b.count - a.count);
}

// 動物占いの3軸分布（行動・思考・心理）
export function axisDistribution() {
  const characterVector = { 未来展望型: 0, 過去回想型: 0 };
  const behaviorPattern = { 目標指向型: 0, 状況対応型: 0 };
  const thinkingPattern = { 左脳型: 0, 右脳型: 0 };
  for (const m of members) {
    characterVector[m.character.characterVector] += 1;
    behaviorPattern[m.character.behaviorPattern] += 1;
    thinkingPattern[m.character.thinkingPattern] += 1;
  }
  return { characterVector, behaviorPattern, thinkingPattern };
}

export { BASE_ANIMALS, GROUP_INFO };
export const GROUP_LABELS = GROUP_INFO;
