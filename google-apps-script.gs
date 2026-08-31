const SPREADSHEET_ID = '1W69uBfOlffwv84GAqjY70nIOSOKHV0YXLB2t1II2gVc';
const SHEET_NAME = 'Cadastros';

function doGet() {
  return HtmlService.createHtmlOutput(
    '<!doctype html><meta charset="utf-8"><title>Adverbio Atacado</title>' +
    '<p>Adverbio Atacado API online.</p>'
  );
}

function doPost(e) {
  const requestId = e && e.parameter ? String(e.parameter._requestId || '') : '';
  try {
    const data = (e && e.parameter) ? e.parameter : {};
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('A aba Cadastros não foi encontrada.');

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([
        new Date(),
        safe(data.name),
        safe(data.phone),
        safe(data.email),
        safe(data.documentType),
        safe(data.document),
        safe(data.company),
        safe(data.instagram),
        safe(data.city),
        safe(data.state),
        safe(data.operation),
        safe(data.purchaseRange),
        safe(data.timeline),
        safe(data.frequency),
        safe(data.interests),
        safe(data.message),
        truthy(data.marketing) ? 'Sim' : 'Não',
        Number(data.score || 0),
        safe(data.classification),
        safe(data.consultant),
        safe(data.source || 'Atacado Adverbio'),
        safe(data.status || 'Novo cadastro'),
        safe(data.observations)
      ]);
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }

    return responsePage({
      channel: 'adverbio-atacado',
      ok: true,
      requestId: requestId
    });
  } catch (err) {
    console.error(err);
    return responsePage({
      channel: 'adverbio-atacado',
      ok: false,
      requestId: requestId,
      error: String(err && err.message ? err.message : err)
    });
  }
}

function safe(value) {
  if (value === null || value === undefined) return '';
  const text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function truthy(value) {
  return String(value).toLowerCase() === 'true' || String(value) === '1' || String(value).toLowerCase() === 'sim';
}

function responsePage(payload) {
  const json = JSON.stringify(payload).replace(/</g, '\\u003c');
  const html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
    '<script>window.parent.postMessage(' + json + ', "*");</script>' +
    '</body></html>';
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
