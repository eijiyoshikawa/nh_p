/**
 * LINE Messaging API → Google Spreadsheet 自動記録スクリプト
 *
 * 【設定手順】
 * 1. Google スプレッドシートを新規作成
 * 2. スプレッドシートのメニュー「拡張機能」→「Apps Script」を開く
 * 3. このファイルの内容を貼り付ける
 * 4. LINE_CHANNEL_ACCESS_TOKEN を LINE Developers のチャネルアクセストークンに置き換える
 * 5. SPREADSHEET_ID を Google スプレッドシートのIDに置き換える
 *    （URLの https://docs.google.com/spreadsheets/d/XXXXXX/edit の XXXXXX 部分）
 * 6. 「デプロイ」→「新しいデプロイ」→ 種類「ウェブアプリ」→
 *    アクセスできるユーザー「全員」→ デプロイ
 * 7. 表示されたWebアプリURLをコピー
 * 8. LINE Developers → チャネル設定 → Webhook URL に上記URLを貼り付け
 * 9. Webhookの利用を「オン」にする
 *
 * 【スプレッドシートの列構成】（シート名: "問い合わせ"）
 * A列: 日時
 * B列: LINE ユーザーID
 * C列: 表示名
 * D列: メッセージ種別
 * E列: メッセージ内容
 * F列: 対応状況
 */

// ===== 設定 =====
const LINE_CHANNEL_ACCESS_TOKEN = "YOUR_CHANNEL_ACCESS_TOKEN_HERE";
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
const SHEET_NAME = "問い合わせ";

// ===== Webhook受信 =====
function doPost(e) {
  try {
    const json = JSON.parse(e.postData.contents);
    const events = json.events;

    for (const event of events) {
      if (event.type === "message") {
        handleMessage(event);
      } else if (event.type === "follow") {
        handleFollow(event);
      }
    }
  } catch (error) {
    Logger.log("Error: " + error.message);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ===== メッセージ処理 =====
function handleMessage(event) {
  const userId = event.source.userId;
  const profile = getProfile(userId);
  const displayName = profile ? profile.displayName : "不明";

  let messageType = event.message.type;
  let messageText = "";

  switch (event.message.type) {
    case "text":
      messageText = event.message.text;
      break;
    case "image":
      messageText = "[画像]";
      break;
    case "sticker":
      messageText = "[スタンプ]";
      break;
    default:
      messageText = "[" + event.message.type + "]";
  }

  // スプレッドシートに記録
  appendToSheet(userId, displayName, messageType, messageText);

  // 自動返信（初回メッセージの場合）
  if (messageText !== "[スタンプ]") {
    replyMessage(
      event.replyToken,
      "お問い合わせありがとうございます！\n\n" +
        "ひらかた子ども食堂支援NPOです。\n" +
        "担当者が確認次第、ご連絡いたします。\n\n" +
        "【営業時間】平日 9:00〜18:00\n" +
        "※時間外のお問い合わせは翌営業日に対応します。"
    );
  }
}

// ===== フォロー（友だち追加）処理 =====
function handleFollow(event) {
  const userId = event.source.userId;
  const profile = getProfile(userId);
  const displayName = profile ? profile.displayName : "不明";

  // スプレッドシートに記録
  appendToSheet(userId, displayName, "follow", "友だち追加");

  // あいさつメッセージ
  replyMessage(
    event.replyToken,
    "友だち追加ありがとうございます！🎉\n\n" +
      "ひらかた子ども食堂支援NPOの公式LINEです。\n\n" +
      "こちらから気軽にお問い合わせください。\n" +
      "・活動に参加したい\n" +
      "・寄付・協賛について聞きたい\n" +
      "・子ども食堂を始めたい\n" +
      "・その他ご質問\n\n" +
      "メッセージを送っていただければ、担当者がお返事します！"
  );
}

// ===== スプレッドシートに追記 =====
function appendToSheet(userId, displayName, messageType, messageText) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  // シートがなければ作成
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "日時",
      "LINE ユーザーID",
      "表示名",
      "メッセージ種別",
      "メッセージ内容",
      "対応状況",
    ]);
    // ヘッダー行を太字に
    sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
  }

  const now = Utilities.formatDate(
    new Date(),
    "Asia/Tokyo",
    "yyyy/MM/dd HH:mm:ss"
  );

  sheet.appendRow([now, userId, displayName, messageType, messageText, "未対応"]);
}

// ===== LINE プロフィール取得 =====
function getProfile(userId) {
  try {
    const url = "https://api.line.me/v2/bot/profile/" + userId;
    const options = {
      method: "get",
      headers: {
        Authorization: "Bearer " + LINE_CHANNEL_ACCESS_TOKEN,
      },
    };
    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log("Profile fetch error: " + error.message);
    return null;
  }
}

// ===== LINE 返信 =====
function replyMessage(replyToken, text) {
  const url = "https://api.line.me/v2/bot/message/reply";
  const payload = {
    replyToken: replyToken,
    messages: [{ type: "text", text: text }],
  };
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + LINE_CHANNEL_ACCESS_TOKEN,
    },
    payload: JSON.stringify(payload),
  };

  try {
    UrlFetchApp.fetch(url, options);
  } catch (error) {
    Logger.log("Reply error: " + error.message);
  }
}

// ===== 初期設定用：シートにヘッダーを作成 =====
function setupSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  sheet.clear();
  sheet.appendRow([
    "日時",
    "LINE ユーザーID",
    "表示名",
    "メッセージ種別",
    "メッセージ内容",
    "対応状況",
  ]);
  sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 150); // 日時
  sheet.setColumnWidth(2, 200); // ユーザーID
  sheet.setColumnWidth(3, 120); // 表示名
  sheet.setColumnWidth(4, 100); // メッセージ種別
  sheet.setColumnWidth(5, 400); // メッセージ内容
  sheet.setColumnWidth(6, 80); // 対応状況

  Logger.log("シートのセットアップが完了しました");
}
