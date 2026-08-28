const SPREADSHEET_ID = '1W69uBfOlffwv84GAqjY70nIOSOKHV0YXLB2t1II2gVc';
const SHEET_NAME = 'Cadastros';

function doGet() {
  return ContentService.createTextOutput('Adverbio Atacado API online');
}

function doPost(e) {
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || '{}');
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('A aba Cadastros não foi encontrada.');

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
      data.marketing ? 'Sim' : 'Não',
      Number(data.score || 0),
      safe(data.classification),
      safe(data.consultant),
      safe(data.source || 'Atacado Adverbio'),
      safe(data.status || 'Novo cadastro'),
      safe(data.observations)
    ]);

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

function safe(value) {
  if (value === null || value === undefined) return '';
  const text = String(value);
  // Evita que conteúdo digitado pelo visitante seja interpretado como fórmula na planilha.
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
