# Adverbio — Landing de Atacado

## Arquivos para o GitHub
- `index.html` — landing completa
- `config.js` — URL do Apps Script e WhatsApps
- `Dockerfile` / `nginx.conf` — publicação no Easypanel
- `google-apps-script.gs` — código que salva os cadastros no Google Sheets

## Google Sheets já criado
Planilha: **Adverbio - Cadastros Atacado**
ID: `1W69uBfOlffwv84GAqjY70nIOSOKHV0YXLB2t1II2gVc`

## Ativação do formulário (uma única vez)
1. Abra https://script.google.com e crie um novo projeto.
2. Apague o código padrão e cole o conteúdo de `google-apps-script.gs`.
3. Clique em **Implantar > Nova implantação > App da Web**.
4. Executar como: **Você**.
5. Quem tem acesso: **Qualquer pessoa**.
6. Autorize e copie a URL que termina em `/exec`.
7. Cole essa URL em `config.js`, no campo `appsScriptUrl`.
8. Troque também os três números de WhatsApp em `config.js`.
9. Faça commit/push no GitHub e publique pelo Easypanel.

O formulário passa a registrar cada cadastro na aba `Cadastros` e, após o envio, mantém o direcionamento para o WhatsApp correspondente.
