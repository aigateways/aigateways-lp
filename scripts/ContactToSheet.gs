/**
 * お問い合わせフォーム → Google スプレッドシート
 *
 * セットアップ手順は docs/CONTACT_SHEET_SETUP.md を参照してください。
 */

// ★ 送信後のリダイレクト先のベースURL（404 のときはここを確認）
// プロジェクトサイトなので /aigateways-lp を付ける（末尾スラッシュなし）
const SITE_URL = 'https://aigateways.github.io/aigateways-lp';

// スプレッドシートID（このシートに追記します）
// スプレッドシートのURL …/d/【ここがID】/edit の部分
const SPREADSHEET_ID = '1k3MZfsgQtMWZiaOJ1ZCXC-GWmnTtwojJ9g2Be17kUQg';

function doPost(e) {
  try {
    var params = e.parameter;
    var spreadsheet = SPREADSHEET_ID
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();

    // 初回のみヘッダー行を追加
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '送信日時',
        '会社名・組織名',
        'お名前',
        'メールアドレス',
        '電話番号',
        'お問い合わせ内容'
      ]);
      sheet.getRange('1:1').setFontWeight('bold');
    }

    var now = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
    sheet.appendRow([
      now,
      params.company || '',
      params.name || '',
      params.email || '',
      params.phone || '',
      params.message || ''
    ]);

    // 送信完了ページへリダイレクト（SITE_URL を設定している場合）
    var redirectUrl = SITE_URL.replace(/\/$/, '') + '/contact/thanks';
    return HtmlService.createHtmlOutput(
      '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<meta http-equiv="refresh" content="0;url=' + redirectUrl + '">' +
      '<script>window.location.href="' + redirectUrl.replace(/"/g, '&quot;') + '";</script>' +
      '</head><body>送信しました。リダイレクトしています...</body></html>'
    ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setTitle('送信完了');
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
