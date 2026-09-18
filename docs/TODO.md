# やることリスト（全プロジェクト横断）

最終更新: 2026-09-15。上から順に優先度が高い。✅ は完了、⬜ は未着手。

## A. すぐ（今週）— 壊れる前に

| # | やること | 場所 | 所要 |
|---|---|---|---|
| ✅ A-1 | 手元のリモートURLを新リポジトリ名に更新：`cd ~/npo_hirakata && git remote set-url origin https://github.com/eijiyoshikawa/nh_p.git` | ターミナル | 1分 |
| ✅ A-2 | GitHub のデフォルトブランチを `main` に変更（Settings → General → Default branch） | GitHub | 1分 |
| ⬜ A-3 | **Vercel `nexia-lp`（旧名 mirai-lab-nexia）だけ Git 未接続**。他3プロジェクト（npo-hirakata / hirakata-kids / koe-post）は `nh_p` に接続済みで正常。手順：① Settings → **Build and Deployment** → Root Directory に `nexia-lp` を入れて Save（General ではなくこちら。順番厳守：先に設定しないと接続直後のビルドが失敗する）② Settings → Git → Connect Git Repository → GitHub → `eijiyoshikawa/nh_p` ③ Production Branch が `main` か確認 | Vercel | 5分 |
| ⬜ A-3b | 古い PR #2（4月・hirakata-kids の CVE 対応）を Close。中身は media_start に別途反映済みで不要（`next 16.2.4` / `next-mdx-remote ^6` 適用済み） | GitHub | 1分 |
| ⬜ A-4 | 過去に会話で共有した API キーをローテーション（Gemini・Groq・GitHub PAT）。漏えい扱いで再発行し、古いものは無効化 | 各サービス | 15分 |
| ⬜ A-5 | GitHub → Settings → Code security で Dependabot alerts / security updates を ON | GitHub | 1分 |

## B. こえポスト（koe-post）— 動作確認できる状態に

| # | やること | 場所 | 所要 |
|---|---|---|---|
| ⬜ B-1 | Upstash で Redis を新規作成（nexia/npo とは別DB） | console.upstash.com | 5分 |
| ⬜ B-2 | Vercel `koe-post` に環境変数 `ADULT_PASSWORD` / `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` / `RATE_SALT` を設定 → Redeploy | Vercel | 5分 |
| ⬜ B-3 | https://koe-post.vercel.app で試し投稿 → `/adults` でタグ・緊急度が付くか確認 | ブラウザ | 10分 |
| ⬜ B-4 | 運用ルールを決める：誰が読むか／緊急投稿の連絡フロー（誰に・何分以内に）／保存期間／学校への配布方法（QR・学校コード） | 会議 | — |
| ⬜ B-5 | `/about`（保護者・先生向け説明）の文面を確定 | `koe-post/src/app/about/page.tsx` | 30分 |
| ⬜ B-6 | 検知辞書のチューニング（実投稿を見て誤検知・見逃しを追加） | `koe-post/src/lib/safety.ts` | 随時 |
| ⬜ B-7 | 独自ドメイン（例 `koe.skma.asia`）を付けるなら Xserver に CNAME 追加 | Xserver / Vercel | 10分 |

## C. 公式LP（nexia-lp）— 公開情報の穴埋め

| # | やること | 場所 |
|---|---|---|
| ⬜ C-1 | 所在地を確定して差し替え（現在「詳細所在地は設立後に掲載」） | `site.ts` → `org.address` |
| ⬜ C-2 | 名前の由来（現在は案）を実際の由来に | `site.ts` → `nameOrigin` |
| ⬜ C-3 | 理事長メッセージの本人確認・修正 | `site.ts` → `message` |
| ⬜ C-4 | お問い合わせ／ひとことフォームの送信先（Formspree 等）→ `NEXT_PUBLIC_FORM_ENDPOINT` を Vercel に設定。未設定だと mailto 動作 | Vercel |
| ⬜ C-5 | 連携先ロゴ・写真素材の差し込み | `partners` / Hero |
| ⬜ C-6 | ロードマップの時期の最終確認 | `site.ts` → `roadmap` |
| ⬜ C-7 | Instagram / Facebook などSNSが増えたら追加 | `site.ts` → `org.sns`（npo-lp は `content.ts` → `sns`） |
| ⬜ C-8 | Google Analytics or Vercel Analytics の導入 | layout.tsx |

## D. メンバーサイト（npo-lp）

| # | やること | 場所 |
|---|---|---|
| ⬜ D-1 | メンバー写真の Drive フォルダを「リンクを知っている全員が閲覧可」に（未設定なら絵文字表示のまま） | Google Drive |
| ⬜ D-2 | Upstash を接続してカレンダー・タスク・お知らせを保存可能に（`UPSTASH_REDIS_REST_URL/TOKEN`） | Vercel |
| ⬜ D-3 | 各メンバーの SNS リンク入力 | `members.ts` → `sns` |
| ⬜ D-4 | 資金目標・助成金ステータス・資料リンクの更新 | `orgData.ts` |

## E. 子育てメディア（hirakata-kids）

| # | やること | 場所 |
|---|---|---|
| ⬜ E-1 | 残りの記事ドラフト生成（ローカルで `npm run batch -- --provider=groq`、無料枠内で分割実行） | ローカル |
| ⬜ E-2 | 生成済みドラフトの校正 → `draft: true` を外して公開 | `content/articles/*.mdx` |
| ⬜ E-3 | main の変更を `media_start` にマージして本番反映 | git |
| ⬜ E-4 | メルマガ送信先 `NEWSLETTER_WEBHOOK_URL`（任意） | Vercel |

## F. 次の開発候補（決まったら着手）

- こえポスト：緊急投稿の即時通知（LINE／メール）、先生用アカウント（学校コード単位）、傾向グラフ・月次レポート、音声入力
- 公式LP：寄付ページ（法人設立後）、パートナー食堂一覧（地図付き）、英語版概要
- メンバーサイト：投稿時の通知、写真ギャラリー
