export type Grant = {
  id: string;
  name: string;
  category: "hirakata" | "osaka" | "national" | "foundation";
  amount: string;
  rate: string;
  deadline: string;
  contact: string;
  target: string;
  description: string;
  url?: string;
  priority: "high" | "mid" | "low";
  note?: string;
};

export const categoryLabels: Record<Grant["category"], string> = {
  hirakata: "枚方市",
  osaka: "大阪府",
  national: "国",
  foundation: "民間財団",
};

export const grants: Grant[] = [
  // ===== 枚方市 =====
  {
    id: "hirakata-akiya",
    name: "枚方市 地域空き家活用補助制度",
    category: "hirakata",
    amount: "上限150〜250万円",
    rate: "経費の2/3",
    deadline: "通年（工事契約前に要相談）",
    contact: "住宅まちづくり課 TEL: 072-841-1478",
    target: "空き家の改修工事費（建築後15年以上の一戸建て・長屋住宅）",
    description:
      "空き家所有者、またはNPO法人等が所有者の同意を得て地域課題解決に活用する場合の改修費を補助。耐震改修を含む場合は上限250万円。セントラル倉庫の拠点整備に有望。",
    url: "https://www.city.hirakata.osaka.jp/0000047397.html",
    priority: "high",
    note: "★工事契約前に必ず相談が必要",
  },
  {
    id: "hirakata-npo",
    name: "枚方市NPO活動応援基金",
    category: "hirakata",
    amount: "数十万円（実績: 年間3事業に交付）",
    rate: "要確認",
    deadline: "6〜7月に団体登録 → 翌年度申請",
    contact: "市民活動課 TEL: 072-841-1221",
    target: "公益的なNPO活動を行う登録団体",
    description:
      "市民・法人からの寄付（ふるさと納税対象）を原資とする補助金。金額は小さいが、枚方市との関係構築・業務委託獲得の足がかりとして必須。",
    url: "https://city.hirakata.osaka.jp/0000018344.html",
    priority: "mid",
  },
  {
    id: "hirakata-kodomo",
    name: "枚方市 子ども食堂補助金",
    category: "hirakata",
    amount: "数十万円（初期経費+運営経費）",
    rate: "募集要項による",
    deadline: "随時相談受付",
    contact: "子ども青少年政策課 TEL: 072-841-1375",
    target: "市内で子ども食堂を運営する（または新規開始する）団体",
    description:
      "施設改修・備品購入等の初期経費と、食材費・ボランティア謝礼等の運営経費を補助。行政実績づくりに重要。",
    url: "https://www.city.hirakata.osaka.jp/0000010929.html",
    priority: "mid",
  },
  {
    id: "hirakata-shakyo",
    name: "枚方市社会福祉協議会 公募事業助成基金",
    category: "hirakata",
    amount: "要確認（選考委員会審査）",
    rate: "—",
    deadline: "随時確認",
    contact: "枚方市社会福祉協議会 TEL: 072-807-3017",
    target: "市内で活動する非営利団体の福祉活動",
    description:
      "子ども食堂・フードバンク・地域支援活動が対象。地元の助成金として地域での信頼構築に有効。",
    url: "https://www.hirakata-shakyo.net/jyosei/kikin_koubo",
    priority: "low",
  },
  {
    id: "hirakata-takeoff",
    name: "枚方市テイクオフ補助金",
    category: "hirakata",
    amount: "月額上限1万円×6か月 = 最大6万円",
    rate: "賃借料の1/2",
    deadline: "令和7年4月〜令和8年2月10日",
    contact: "ひらっく（枚方市立地域活性化支援センター）",
    target: "市内で事務所等を借りる創業者",
    description:
      "金額は小さいが、倉庫の賃料補助として初期段階で活用可能。特定創業支援等事業の証明が必要。",
    url: "https://www.city.hirakata.osaka.jp/0000003470.html",
    priority: "low",
  },

  // ===== 大阪府 =====
  {
    id: "osaka-fukushi",
    name: "大阪府福祉基金 地域福祉振興助成金",
    category: "osaka",
    amount: "活動費: 上限20万円 / 民間団体提案型: 100〜500万円",
    rate: "要確認",
    deadline: "毎年1月（令和8年度: 1/5〜1/31）",
    contact: "大阪府福祉部 地域福祉推進室 TEL: 06-6941-0351（内線4505）",
    target: "大阪府内で社会福祉活動を行う非営利団体",
    description:
      "「民間団体提案型」で100〜500万円が狙える大型枠あり。子ども食堂支援ネットワーク事業として申請設計すると効果的。",
    url: "https://www.pref.osaka.lg.jp/o090020/chiikifukushi/kikin/joseikinnnobosyuu.html",
    priority: "high",
  },
  {
    id: "osaka-shoku",
    name: "大阪府 子ども食堂における食の支援事業",
    category: "osaka",
    amount: "食品セットを毎月1回配付（現物支給）",
    rate: "—",
    deadline: "令和7年6月〜令和8年3月",
    contact: "大阪府 子育て支援課",
    target: "大阪府内の子ども食堂運営団体",
    description:
      "缶詰・レトルト食品等の食品セットを配付。直接的な資金ではないが、食材費の削減に有効。",
    url: "https://www.pref.osaka.lg.jp/o090120/kosodateshien2/shokuhinnsetto/index.html",
    priority: "low",
  },

  // ===== 国 =====
  {
    id: "wam-normal",
    name: "WAM助成金（福祉医療機構）通常助成",
    category: "national",
    amount: "地域連携: 50〜700万円 / 全国ネットワーク: 50〜900万円",
    rate: "補助対象経費の範囲内",
    deadline: "毎年12月〜1月下旬",
    contact: "WAMに直接申請（枚方市社協に相談推奨）",
    target: "NPO法人等の社会福祉振興に寄与する非営利団体",
    description:
      "子ども食堂・フードバンク事業は重点分野。連続2〜3年の助成が可能で、セントラル倉庫設備費も対象になり得る。行政系資金調達の最重要制度。",
    url: "https://www.wam.go.jp/hp/cat/wamjosei/",
    priority: "high",
    note: "★2〜3年の継続助成が可能。モデル事業枠は最大3,000万円/3年",
  },
  {
    id: "kodomo-mirai",
    name: "こどもの未来応援基金",
    category: "national",
    amount: "事業A: 150〜400万円 / 事業B: 〜150万円",
    rate: "申請額全額（上限内）",
    deadline: "毎年8〜9月中旬",
    contact: "WAM NPOリソースセンター TEL: 03-3438-4756",
    target: "子どもの貧困対策に資する事業を行うNPO法人等",
    description:
      "子ども食堂支援・フードバンクを通じた貧困対策として高い適合性。理事2名以上が要件。",
    url: "https://kodomohinkon.go.jp/",
    priority: "mid",
  },
  {
    id: "jizokuka",
    name: "小規模事業者持続化補助金",
    category: "national",
    amount: "通常: 上限50万円 / 特例加算で最大250万円",
    rate: "2/3（赤字事業者は3/4）",
    deadline: "年1〜2回公募（枚方商工会議所経由）",
    contact: "枚方商工会議所（事業支援計画書の発行が必須）",
    target: "小規模事業者及び一定要件を満たすNPO法人",
    description:
      "自主事業の販路開拓、ECサイト構築、チラシ・PR費用、倉庫の設備投資に活用可能。採択率約50〜60%と比較的高い。",
    url: "https://www.jizokukahojokin.info/",
    priority: "mid",
    note: "収益事業を行っていることが条件",
  },
  {
    id: "kodomo-shokuji",
    name: "こども家庭庁 ひとり親家庭等の子どもの食事等支援事業",
    category: "national",
    amount: "小規模: 上限100万円 / スタンダード: 上限300万円",
    rate: "全額（上限内）",
    deadline: "毎年6〜7月頃（中間支援団体経由）",
    contact: "むすびえ・フローレンス・キッズドア等の中間支援団体経由",
    target: "子ども食堂・フードパントリー・子ども宅食を実施する団体",
    description:
      "フードバンク・食材配送事業と直結。食材物流拠点としての活動に適合。",
    url: "https://www.cfa.go.jp/policies/hitori-oya/kodomo-syokuji-koubo",
    priority: "mid",
  },
  {
    id: "digital-ai",
    name: "デジタル化・AI導入補助金2026",
    category: "national",
    amount: "通常枠: 5〜450万円",
    rate: "1/2（小規模は最大4/5）",
    deadline: "2026年度は複数回公募予定",
    contact: "IT導入支援事業者とパートナーシップを組んで申請",
    target: "NPO法人を含む中小企業・小規模事業者",
    description:
      "食材管理システム、在庫管理、物流管理システム、会計ソフト等の導入に活用可能。",
    url: "https://it-shien.smrj.go.jp/",
    priority: "low",
  },

  // ===== 民間財団 =====
  {
    id: "nippon-zaidan",
    name: "日本財団「子ども第三の居場所」事業",
    category: "foundation",
    amount: "包括ケア: 上限5,000万円（補助率100%）",
    rate: "80〜100%",
    deadline: "毎年10月",
    contact: "日本財団に直接申請",
    target: "NPO法人等（週3〜5日開所の拠点運営が条件）",
    description:
      "補助率100%で最大5,000万円は破格。「子どもの居場所」として拠点化する場合にセントラルキッチン整備費も含め得る。自治体との連携が求められる。",
    url: "https://nippon-foundation.my.site.com/GrantPrograms/",
    priority: "high",
    note: "★補助率100%。採択されれば目標を大幅超過",
  },
  {
    id: "osaka-community",
    name: "大阪コミュニティ財団",
    category: "foundation",
    amount: "基金により異なる（数十万〜数百万円）",
    rate: "—",
    deadline: "毎年11月25日",
    contact: "大阪コミュニティ財団 TEL: 06-6944-6260",
    target: "1年以上の活動実績を有する非営利団体",
    description:
      "子ども福祉関連の複数の冠基金あり。大阪に本拠を置く財団で地域NPOに手厚い。毎年申請可能。",
    url: "https://osaka-community.or.jp/",
    priority: "mid",
  },
  {
    id: "kagome",
    name: "カゴメみらいやさい財団助成",
    category: "foundation",
    amount: "継続応援: 30〜50万円 / スタートアップ: 上限10万円",
    rate: "—",
    deadline: "毎年12月〜1月中旬",
    contact: "カゴメみらいやさい財団",
    target: "子ども食堂を運営する団体（法人格不問）",
    description:
      "子ども食堂に特化した助成金。継続応援コースは56団体程度が採択される。",
    url: "https://kagome-miraiyasai.or.jp/support/",
    priority: "low",
  },
  {
    id: "kirin",
    name: "キリン福祉財団「地域のちから応援事業」",
    category: "foundation",
    amount: "上限30万円（総額4,500万円）",
    rate: "—",
    deadline: "毎年9〜10月",
    contact: "キリン福祉財団",
    target: "地域のボランティア活動を行う団体",
    description:
      "子ども・子育て関連も対象。「福祉のちから開拓事業」は全国活動対象で上限100万円。",
    url: "https://foundation.kirinholdings.com/subsidy/",
    priority: "low",
  },
  {
    id: "toyota",
    name: "トヨタ財団 国内助成プログラム",
    category: "foundation",
    amount: "カテゴリA: 上限1,500万円/3年 / B: 上限600万円/2年",
    rate: "—",
    deadline: "毎年6月頃",
    contact: "トヨタ財団",
    target: "地域における自治を推進するプロジェクトチーム",
    description:
      "食材物流システムの社会モデル化として申請可能。法人格不問。高額だが競争率も高い。",
    url: "https://www.toyotafound.or.jp/grant/community/",
    priority: "mid",
  },
  {
    id: "musubie",
    name: "むすびえ・こども食堂基金",
    category: "foundation",
    amount: "数万〜数十万円",
    rate: "—",
    deadline: "年2回（春・秋）",
    contact: "むすびえ",
    target: "全国のこども食堂運営団体",
    description:
      "累計約1億200万円を1,448団体に助成した実績。採択率が比較的高く、実績づくりに最適。",
    url: "https://musubie.org/grant-list",
    priority: "low",
  },
  {
    id: "shinnyo",
    name: "真如苑 こども食堂支援助成",
    category: "foundation",
    amount: "上限20万円",
    rate: "—",
    deadline: "毎年5月頃",
    contact: "真如苑",
    target: "年間事業費200万円以下の非営利団体（1年以上の活動実績）",
    description:
      "小規模団体向けの助成金。金額は小さいが採択されやすく、初期の実績づくりに有効。",
    url: "https://kobo.shinnyo-en.or.jp/kodomo/",
    priority: "low",
  },
  {
    id: "familymart",
    name: "ファミリーマート＆むすびえ スタート応援助成",
    category: "foundation",
    amount: "1団体5万円（250団体上限）",
    rate: "—",
    deadline: "年3回公募（通年応募可）",
    contact: "むすびえ経由",
    target: "新規開設のこども食堂",
    description:
      "新規開設時の初期費用に。金額は小さいが採択されやすく、最初の一歩として有効。",
    url: "https://musubie.org/news/fami/start/30190",
    priority: "low",
  },
];
