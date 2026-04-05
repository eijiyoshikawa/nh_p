# LINE公式 → スプレッドシート連携 セットアップ手順

## 全体の流れ

```
LP問い合わせボタン → LINE公式アカウント → Webhook → Google Apps Script → スプレッドシート
```

## 1. LINE公式アカウントの作成

1. [LINE Official Account Manager](https://manager.line.biz/) にアクセス
2. 「アカウントを作成」→ 必要情報を入力
3. 作成完了後、アカウント設定画面で **LINE ID**（@xxxxx）を確認
4. LP の `src/lib/content.ts` の `lineUrl` を実際のURLに差し替え:
   ```ts
   export const lineUrl = "https://line.me/R/ti/p/@あなたのID";
   ```

## 2. LINE Messaging API の有効化

1. [LINE Developers](https://developers.line.biz/) にログイン
2. 新しいプロバイダーを作成（またはLINE公式アカウントと連携）
3. Messaging API チャネルを作成
4. **チャネルアクセストークン（長期）** を発行 → メモしておく

## 3. Google スプレッドシートの準備

1. [Google スプレッドシート](https://sheets.google.com/) で新規作成
2. URLから **スプレッドシートID** をメモ
   - `https://docs.google.com/spreadsheets/d/XXXXX/edit` の `XXXXX` 部分

## 4. Google Apps Script のデプロイ

1. スプレッドシートのメニュー「拡張機能」→「Apps Script」
2. `gas-webhook.gs` の内容を貼り付け
3. 以下を書き換え:
   - `LINE_CHANNEL_ACCESS_TOKEN` → 手順2で取得したトークン
   - `SPREADSHEET_ID` → 手順3のスプレッドシートID
4. `setupSheet` 関数を実行（初回のみ・ヘッダー作成）
5. 「デプロイ」→「新しいデプロイ」
   - 種類: ウェブアプリ
   - 実行するユーザー: 自分
   - アクセスできるユーザー: **全員**
6. 「デプロイ」→ 表示されたURLをコピー

## 5. Webhook の設定

1. LINE Developers → チャネル設定
2. **Webhook URL** に手順4のURLを貼り付け
3. **Webhookの利用** を「オン」
4. 「検証」ボタンで接続テスト

## 6. 動作確認

1. LINE公式アカウントを友だち追加
2. メッセージを送信
3. スプレッドシートの「問い合わせ」シートにデータが記録されることを確認

## スプレッドシートの列構成

| 列 | 内容 | 例 |
|----|------|-----|
| A | 日時 | 2026/04/05 14:30:00 |
| B | LINE ユーザーID | U1234567890abcdef |
| C | 表示名 | 山田太郎 |
| D | メッセージ種別 | text / follow / image |
| E | メッセージ内容 | 活動に参加したいです |
| F | 対応状況 | 未対応 |

## 注意事項

- GAS の無料枠: 1日あたり20,000回のURL Fetch（十分な量）
- LINE Messaging API の無料枠: 月200通まで（無料プラン）
- 月200通を超える場合は、ライトプラン（月5,000円）への変更を検討
