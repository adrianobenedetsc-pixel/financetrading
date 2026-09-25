# 🚀 Deploy

Guia rápido para publicar o **Trader Finance** em diferentes plataformas.

---

## 📦 Instalação e Build

### Via arquivo compactado (tar.gz)

```bash
# Crie a pasta do projeto
mkdir dashboard

# Extraia o arquivo tar.gz para a pasta
tar -xf workspace -C dashboard

# Entre na pasta do projeto
cd dashboard

# Instale as dependências
npm install

# Gere a build otimizada
npm run build
```

> 💡 O arquivo `workspace` é um arquivo `.tar.gz` compactado. O comando `tar -xf` extrai automaticamente.

### Via Git

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/trader-finance.git
cd trader-finance

# Instale as dependências
npm install

# Gere a build otimizada
npm run build
```

Os arquivos estarão na pasta `dist/` prontos para publicação.

---

## 🌐 Vercel (Recomendado)

A forma mais simples e rápida de deploy.

### Via CLI

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel
```

### Via GitHub

1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório do GitHub
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Clique em **Deploy**

✅ Deploy automático a cada push!

---

## 🔷 Netlify

### Via Drag & Drop

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Arraste a pasta `dist/` para a área de upload
3. Pronto!

### Via GitHub

1. Conecte seu repositório
2. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Deploy automático ativado

---

## 🐙 GitHub Pages

### Setup Manual

1. No `vite.config.js`, adicione:

```js
export default defineConfig({
  base: '/nome-do-repositorio/',
  // ... resto da config
})
```

2. Instale o plugin de deploy:

```bash
npm install -D gh-pages
```

3. Adicione ao `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

4. Deploy:

```bash
npm run deploy
```

5. Em **Settings → Pages** do repositório, selecione a branch `gh-pages`

---

## 🐳 Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Comandos

```bash
# Build da imagem
docker build -t trader-finance .

# Rodar container
docker run -p 8080:80 trader-finance
```

Acesse em `http://localhost:8080`

---

## 💻 Hospedagem Própria

### Nginx

```nginx
server {
    listen 80;
    server finance.seudominio.com;
    root /var/www/trader-finance/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache

```apache
<VirtualHost *:80>
    ServerName finance.seudominio.com
    DocumentRoot /var/www/trader-finance/dist

    <Directory /var/www/trader-finance/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

---

## 📱 PWA (Progressive Web App)

Para tornar instalável em dispositivos móveis, adicione um `manifest.json` na pasta `public/`:

```json
{
  "name": "Trader Finance",
  "short_name": "Trader",
  "description": "Gestão de carteiras cripto",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f5f5f7",
  "theme_color": "#0071e3",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🔒 HTTPS

**Importante**: Sempre use HTTPS em produção para garantir a segurança dos dados.

- **Vercel/Netlify**: HTTPS automático
- **GitHub Pages**: Ative em Settings → Pages → Enforce HTTPS
- **Hospedagem própria**: Use [Let's Encrypt](https://letsencrypt.org/) com Certbot

---

## ⚡ Otimizações

### Compressão Gzip

No Nginx:

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml;
```

### Cache de Assets

Os assets já têm hash no nome, então configure cache longo:

```nginx
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🆘 Problemas Comuns

### Rota não funciona após refresh

Certifique-se de que o servidor redireciona todas as rotas para `index.html` (configuração acima).

### Cotações não aparecem

Verifique se as cotações foram inseridas manualmente na aba "Cotações" e salvas.

### Build muito grande

O bundle pode ser otimizado com code-splitting. Veja a documentação do Vite sobre `manualChunks`.

---

## 📞 Suporte

Se tiver problemas no deploy, abra uma issue no GitHub!
