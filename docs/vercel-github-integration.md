# Vercel × GitHub 連携 — 設定と「壊れない」ための仕組み

最終更新: 2026-09-15

## 1. いま入っている仕組み（自動）

| 仕組み | 場所 | 何を防ぐか |
|---|---|---|
| **変更のないプロジェクトはビルドしない** | 各プロジェクトの `vercel.json` → `ignoreCommand` | 1リポジトリに3サイトが同居しているため、たとえば nexia-lp だけ直して push しても npo-lp / hirakata-kids のビルドが走り、無駄な失敗デプロイ（赤い ✘ フラグ）や無料枠の消費につながる。ディレクトリに差分がないときはビルドをスキップ（Vercel 上は "Canceled"、コミットには赤フラグが付かない） |
| **push 前にリント＋ビルドを検証** | `.github/workflows/{nexia-lp,npo-lp,hirakata-kids}-ci.yml` | 壊れたコードが本番ブランチに入る前に GitHub Actions で検出。プロジェクトのフォルダに変更があったときだけ走る |
| **依存パッケージの脆弱性を放置しない** | `.github/dependabot.yml` | GitHub の「Security alerts」フラグを溜めない。週1回 minor/patch をまとめて PR。Next / React のメジャーは自動更新しない |
| **Node バージョン固定** | 各 `.nvmrc`（20）＋ `package.json` の `engines` | CI と Vercel で挙動が変わるのを防ぐ |

## 2. Vercel ダッシュボードで一度だけ確認する設定（手動）

各プロジェクト → **Settings → General / Git**

| プロジェクト | Root Directory | Production Branch | 備考 |
|---|---|---|---|
| `mirai-lab-nexia` | `nexia-lp` | `main` | **Git 未接続なら `vercel git connect` で接続**（下記） |
| `npo-hirakata` | `npo-lp` | `main` | |
| `hirakata-kids` | `hirakata-kids` | `media_start` | |

- **Root Directory が空だと必ず失敗**します（リポジトリ直下に package.json がないため）。連携を貼り直したときは最初にここを確認。
- 「Include source files outside of the Root Directory in the Build Step」は **ON**（`ignoreCommand` の git diff が動くために必要。既定で ON）。
- Ignored Build Step は「Automatic」のまま（`vercel.json` の `ignoreCommand` が優先されます）。

### mirai-lab-nexia を Git に接続する（初回のみ）

```bash
cd ~/npo_hirakata/nexia-lp
vercel git connect
```
→ `eijiyoshikawa/npo_hirakata` を選択。接続後、ダッシュボードで Root Directory を `nexia-lp`、Production Branch を `main` に設定。

接続後は `git push origin main` だけで本番に反映されます（`vercel deploy --prod` も引き続き使えます）。

## 3. GitHub 側で一度だけ確認する設定（手動）

1. **リポジトリのデフォルトブランチを `main` に**
   GitHub → Settings → General → Default branch。現在は古い作業ブランチ（`claude/npo-pdf-to-markdown-HDpUL`）のままで、Vercel が新規連携時に間違ったブランチを拾う原因になります。
2. **Vercel GitHub App の権限**
   GitHub → Settings → Applications → Vercel → `npo_hirakata` にアクセス権があること。連携が「切れた」ときの原因はほぼこれ（App のアンインストール／リポジトリの選択解除）。
3. **Dependabot を有効化**
   GitHub → Settings → Code security → Dependabot alerts / security updates を ON。

## 4. 連携が壊れたときの見分け方と直し方

| 症状 | 原因 | 対処 |
|---|---|---|
| push しても Vercel にデプロイが出ない | GitHub App が外れている／Git 未接続 | 上記 3-2 を確認 → `vercel git connect` |
| デプロイが毎回 Error（赤 ✘） | Root Directory が空、または Node バージョン不一致 | 上記 2 の表どおりに設定 |
| 関係ないプロジェクトまでビルドされる | `vercel.json` の `ignoreCommand` が無い／Root Directory 外 | 各プロジェクトの `vercel.json` を確認 |
| 「Only apex domains can be added without a project」 | CLI の仕様 | `vercel domains add <domain> <project>` |
| `vercel` が別チーム（LET）を向く | CLI のスコープ | `vercel switch eijiyoshikawas-projects` |

いずれの場合も、**手動デプロイは常に使えます**：
```bash
cd ~/npo_hirakata/<project> && git pull origin main && vercel deploy --prod
```

## 5. 運用ルール（人間側）

- 本番ブランチに直接 push する前に、手元で `npm run lint && npm run build` を通す（CI でも同じことを検証）。
- 3サイトの変更を1コミットに混ぜない（どのサイトのビルドが走るか分かりやすくするため）。
- Dependabot の PR は CI が緑なら week 内にマージ。赤なら放置せず、内容を確認して close か修正。
