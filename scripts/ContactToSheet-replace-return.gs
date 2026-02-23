/**
 * 現在デプロイしている doPost の「返り値」だけを置き換える用です。
 * スプレッドシートに「スプレッドシートにバインド」した状態で使う想定です。
 *
 * 使い方: Apps Script エディタで doPost の最後の return を、
 * このファイルの「return ～」部分に差し替えて保存 → 新バージョンでデプロイ
 */

// ★ あなたのサイトの完了ページのベースURL（GitHub Pages の場合はこのままでOK）
var SITE_URL = 'https://aigateways.github.io/aigateways-lp';

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // フォームから送られてきたデータを受け取る
  var company = e.parameter.company;
  var name = e.parameter.name;
  var email = e.parameter.email;
  var phone = e.parameter.phone ? "'" + e.parameter.phone : "";  // 先頭0を保持する場合
  var message = e.parameter.message;

  // 現在の日時を取得
  var timestamp = new Date();

  // スプレッドシートの最終行にデータを追加
  sheet.appendRow([timestamp, company, name, email, phone, message]);

  // ★ ここを変更: "Success" の代わりに完了ページへリダイレクトする HTML を返す
  var redirectUrl = SITE_URL.replace(/\/$/, '') + '/contact/thanks';
  return HtmlService.createHtmlOutput(
    '<!DOCTYPE html><html><head><meta charset="utf-8">' +
    '<meta http-equiv="refresh" content="0;url=' + redirectUrl + '">' +
    '<script>window.location.href="' + redirectUrl.replace(/"/g, '&quot;') + '";</script>' +
    '</head><body>送信しました。リダイレクトしています...</body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setTitle('送信完了');
}
