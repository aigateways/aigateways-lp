// ★ 完了ページのベースURL（GitHub Pages）
var SITE_URL = 'https://aigateways.github.io/aigateways-lp';

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var company = e.parameter.company;
  var name = e.parameter.name;
  var email = e.parameter.email;
  var phone = e.parameter.phone ? "'" + e.parameter.phone : "";
  var message = e.parameter.message;

  var timestamp = new Date();
  sheet.appendRow([timestamp, company, name, email, phone, message]);

  // 完了ページへリダイレクト（"Success" を返さない）
  var redirectUrl = SITE_URL.replace(/\/$/, '') + '/contact/thanks';
  return HtmlService.createHtmlOutput(
    '<!DOCTYPE html><html><head><meta charset="utf-8">' +
    '<meta http-equiv="refresh" content="0;url=' + redirectUrl + '">' +
    '<script>window.location.href="' + redirectUrl.replace(/"/g, '&quot;') + '";</script>' +
    '</head><body>送信しました。リダイレクトしています...</body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setTitle('送信完了');
}
