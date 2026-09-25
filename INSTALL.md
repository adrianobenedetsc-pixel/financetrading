# 📥 Guia de Instalação

Este guia vai te ajudar a instalar o **Trader Finance** no seu computador.

---

## 🎯 Pré-requisitos

Antes de começar, você precisa ter instalado:

### 1. Node.js (versão 18 ou superior)

**Windows:**
1. Acesse [nodejs.org](https://nodejs.org/)
2. Baixe a versão LTS (recomendada)
3. Execute o instalador e siga as instruções
4. Verifique a instalação abrindo o CMD e digitando:
   ```bash
   node --version
   npm --version
   ```

**macOS:**
```bash
# Usando Homebrew (recomendado)
brew install node

# Ou baixe o instalador em nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 📦 Instalação via Arquivo Compactado

### Passo 1: Preparar o ambiente

Abra o terminal (CMD no Windows, Terminal no macOS/Linux) e navegue até a pasta onde você quer instalar o projeto:

```bash
# Exemplo: ir para a pasta Documentos
cd Documentos
```

### Passo 2: Criar a pasta do projeto

```bash
mkdir dashboard
```

### Passo 3: Extrair o arquivo

Coloque o arquivo `workspace` (tar.gz) na pasta atual e extraia:

**Windows (usando Git Bash ou WSL):**
```bash
tar -xf workspace -C dashboard
```

**Windows (sem tar):**
1. Baixe o [7-Zip](https://www.7-zip.org/)
2. Clique com o botão direito no arquivo `workspace`
3. Selecione "7-Zip" → "Extrair para dashboard\"

**macOS/Linux:**
```bash
tar -xf workspace -C dashboard
```

### Passo 4: Entrar na pasta

```bash
cd dashboard
```

### Passo 5: Instalar dependências

```bash
npm install
```

> ⏳ Isso pode levar alguns minutos. O npm vai baixar todas as bibliotecas necessárias.

### Passo 6: Iniciar o projeto

```bash
npm run dev
```

### Passo 7: Acessar a aplicação

Abra seu navegador e acesse:

```
http://localhost:3000
```

---

## 🔄 Instalação via Git

Se você tem o Git instalado:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/trader-finance.git

# Entre na pasta
cd trader-finance

# Instale as dependências
npm install

# Inicie o servidor
npm run dev
```

---

## 🏗️ Build para Produção

Quando quiser gerar a versão final para deploy:

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

Para testar a build localmente:

```bash
npm run preview
```

---

## 📋 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build otimizada para produção |
| `npm run preview` | Visualiza a build de produção localmente |

---

## 🆘 Problemas Comuns

### "npm não é reconhecido como comando"

**Solução:** Reinstale o Node.js e reinicie o terminal.

### "EACCES: permission denied" (Linux/macOS)

**Solução:** Não use `sudo` com npm. Em vez disso, configure as permissões:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### "Port 3000 já está em uso"

**Solução:** Outra aplicação está usando a porta 3000. Você pode:
1. Fechar a outra aplicação, ou
2. Mudar a porta no `vite.config.js`:
   ```js
   export default defineConfig({
     server: {
       port: 3001
     }
   })
   ```

### "Cannot find module" após npm install

**Solução:** Delete a pasta `node_modules` e reinstale:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro ao extrair tar.gz no Windows

**Solução:** O Windows 10/11 tem o tar nativo, mas se não funcionar:
1. Baixe o [7-Zip](https://www.7-zip.org/)
2. Use o 7-Zip para extrair o arquivo
3. Ou use o Git Bash que vem com o [Git for Windows](https://git-scm.com/)

---

## 💡 Dicas

### Atalhos do Terminal

- **Ctrl + C**: Para o servidor em execução
- **Ctrl + L** (Linux/Mac) ou **Ctrl + K** (Windows): Limpa o terminal
- **Tab**: Autocompleta nomes de arquivos e pastas

### Editor Recomendado

Use o [Visual Studio Code](https://code.visualstudio.com/) com as extensões:
- ESLint
- Prettier
- TypeScript
- Tailwind CSS IntelliSense

---

## 📞 Precisa de Ajuda?

Se tiver problemas na instalação:

1. Verifique se o Node.js está instalado: `node --version`
2. Verifique se está na pasta correta: `ls` (Linux/Mac) ou `dir` (Windows)
3. Tente deletar `node_modules` e reinstalar
4. Abra uma issue no GitHub com o erro completo

---

<div align="center">
  <sub>Boa instalação! 🚀</sub>
</div>
