# Finanças Pessoais
 
App de timeline financeira pessoal. PWA instalável no celular.
 
## Como fazer deploy na Netlify
 
### Opção 1 — Deploy pelo site da Netlify (mais fácil)
 
1. Acesse [netlify.com](https://netlify.com) e crie uma conta gratuita
2. No painel, clique em **"Add new site" → "Deploy manually"**
3. Faça o build local primeiro:
   ```bash
   npm install
   npm run build
   ```
4. Arraste a pasta `dist/` para a área de upload da Netlify
5. Pronto! Seu app estará online em segundos
 
### Opção 2 — Deploy via GitHub (recomendado para atualizações)
 
1. Suba este projeto para um repositório no GitHub
2. No painel da Netlify, clique em **"Add new site" → "Import an existing project"**
3. Conecte ao GitHub e selecione o repositório
4. As configurações são detectadas automaticamente pelo `netlify.toml`
5. Clique em **"Deploy site"**
 
### Opção 3 — Deploy via CLI
 
```bash
npm install -g netlify-cli
npm install
npm run build
netlify deploy --prod --dir=dist
```
 
## Rodar localmente
 
```bash
npm install
npm run dev
```
 
Acesse: http://localhost:5173
 
## Instalar no celular como PWA
 
Após o deploy na Netlify:
 
1. Abra o link no **Safari (iOS)** ou **Chrome (Android)**
2. iOS: toque em compartilhar → "Adicionar à Tela de Início"
3. Android: toque no menu → "Instalar aplicativo" ou "Adicionar à tela inicial"
 
## Stack
 
- React 18 + TypeScript
- Vite + vite-plugin-pwa
- Tailwind (via CSS customizado)
- localStorage para persistência
 
