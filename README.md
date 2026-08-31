# Adverbio Atacado — V5 confirmação real

Esta versão corrige o envio do formulário.

## O que mudou
- A landing não usa mais `fetch(..., no-cors)` como confirmação.
- O cadastro é enviado por POST para um iframe oculto.
- O Apps Script grava a linha na aba `Cadastros`, chama `SpreadsheetApp.flush()` e só então responde `ok:true` à landing por `postMessage`.
- A tela “Solicitação enviada” só aparece depois dessa confirmação.
- CPF → Eliane (5562999111737).
- CNPJ → Lana (5562998698656).

## PASSO OBRIGATÓRIO NO GOOGLE APPS SCRIPT
1. Abra o projeto que gerou a URL `/exec`.
2. Substitua todo o código pelo conteúdo de `google-apps-script.gs`.
3. Salve.
4. Vá em **Implantar > Gerenciar implantações**.
5. Clique no lápis da implantação atual.
6. Em **Versão**, escolha **Nova versão**.
7. Confirme **Executar como: você** e acesso **Qualquer pessoa**.
8. Clique em **Implantar**.

A URL `/exec` permanece a mesma quando você atualiza a implantação existente.

Depois, publique os arquivos da landing e faça um cadastro real de teste.
