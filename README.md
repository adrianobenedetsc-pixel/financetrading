# Trader Finance

<div align="center">
  
  ### 💼 Gestão financeira minimalista para traders de cripto
  
  <sub>Design Apple-like • 100% local • Multi-moeda (BRL, USD, BTC)</sub>
  
  <br>
  
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  
</div>

---

## 📖 Sobre

**Trader Finance** é uma aplicação web focada em traders de cripto que precisam de uma forma simples e direta de gerenciar múltiplas carteiras sem a complexidade de exchanges. 

Os dados são armazenados **100% localmente** no navegador, garantindo privacidade total e funcionamento offline.

### ✨ Destaques

- 🎨 **Design Apple-like** — UI limpa, minimalista e elegante
- 💰 **Multi-moeda** — Suporte nativo a BRL, USD e BTC
- 📊 **Gráfico manual** — Registre pontos do patrimônio quando quiser
- 💾 **100% local** — Dados salvos no seu navegador, sem servidor
- 📦 **Backup completo** — Exporte e importe seus dados em JSON
- 🔄 **Cotações manuais** — Você controla quando atualizar os valores

---

## 🚀 Funcionalidades

| Aba | Descrição |
|-----|-----------|
| 📊 **Resumo** | Visão geral com saldos em USD, BRL e BTC + patrimônio total |
| 👛 **Carteiras** | Gerencie wallets identificadas pelos 4 últimos dígitos |
| 📈 **Gráfico** | Registre manualmente a evolução do patrimônio |
| 💵 **Cotações** | Atualize BTC/USD e câmbio USD/BRL manualmente |
| 💾 **Dados** | Backup, exportação e importação em JSON |

---

## 📦 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ instalado
- npm ou yarn

### Opção 1: Via arquivo compactado (recomendado)

```bash
# Crie a pasta do projeto
mkdir dashboard

# Extraia o arquivo tar.gz para a pasta
tar -xf workspace -C dashboard

# Entre na pasta do projeto
cd dashboard

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

> 💡 O arquivo `workspace` é um arquivo `.tar.gz` compactado. O comando `tar -xf` extrai automaticamente.

### Opção 2: Via Git

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/trader-finance.git

# Entre na pasta do projeto
cd trader-finance

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Acessando a aplicação

Após iniciar, a aplicação estará disponível em:

```
http://localhost:3000
```

> 📖 **Guia detalhado de instalação:** Veja [INSTALL.md](INSTALL.md) para instruções passo a passo, incluindo solução de problemas comuns.

---

## 🏗️ Build para Produção

```bash
# Gere a build otimizada
npm run build

# Os arquivos estarão em /dist
```

Para servir a build localmente:

```bash
npm run preview
```

---

## 🎯 Como Usar

### 1. Configurando Cotações

Antes de começar, configure as cotações:

1. Vá em **Cotações**
2. Clique em **Atualizar Cotações**
3. Insira o valor do Bitcoin em USD (ex: `95000`)
4. Insira o câmbio 1 USD em BRL (ex: `5.42`)
5. Clique em **Salvar Cotações**

### 2. Adicionando uma Carteira

1. Vá em **Carteiras**
2. Clique em **Nova Carteira**
3. Digite os **4 últimos dígitos** do endereço (ex: `A1B2`)
4. Escolha a moeda: **BRL**, **USD** ou **BTC**
5. Informe o saldo atual
6. Clique em **Adicionar**

### 3. Registrando Pontos no Gráfico

1. Vá em **Gráfico**
2. Clique em **Registrar Ponto**
3. O valor atual do seu portfólio (em USD) será capturado automaticamente
4. Repita quantas vezes quiser — cada registro vira um ponto no gráfico

### 4. Fazendo Backup

1. Vá em **Dados**
2. Clique em **Baixar JSON** para salvar um backup
3. Para restaurar, use **Selecionar Arquivo** e escolha o JSON exportado

---

## 📁 Estrutura do Projeto

```
trader-finance/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Sidebar e estrutura principal
│   ├── pages/
│   │   ├── Dashboard.tsx       # Resumo do portfólio
│   │   ├── Wallets.tsx         # Gestão de carteiras
│   │   ├── Chart.tsx           # Gráfico de evolução
│   │   ├── Prices.tsx          # Cotações manuais
│   │   └── Data.tsx            # Backup e exportação
│   ├── store/
│   │   └── useStore.ts         # Hooks de estado
│   ├── hooks/
│   │   └── usePrices.ts        # Hook de cotações
│   ├── types/
│   │   └── index.ts            # Definições TypeScript
│   ├── App.tsx                 # Rotas principais
│   ├── main.tsx                # Entry point
│   └── index.css               # Estilos globais
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Função |
|------------|--------|--------|
| React | 18 | Framework UI |
| TypeScript | 5 | Tipagem estática |
| Vite | 6 | Build tool |
| Tailwind CSS | 4 | Estilização |
| React Router | 6 | Navegação |
| Recharts | 2 | Gráficos |
| Lucide React | 0.294 | Ícones |
| uuid | 9 | IDs únicos |

---

## 🔑 Conceitos Principais

### Identificação de Carteiras
As carteiras são identificadas pelos **4 últimos dígitos do endereço** (ex: `A1B2`). Isso mantém a privacidade enquanto permite identificação visual rápida.

### Cotações Manuais
Diferente de trackers automáticos, as cotações são inseridas manualmente pelo usuário. Isso garante:
- Total controle sobre os valores
- Funcionamento offline
- Independência de APIs externas

### Registro Manual de Pontos
O gráfico funciona com **registro manual** — você decide quando capturar o valor do portfólio, ideal para acompanhar decisões de trading específicas.

### Armazenamento Local
Todos os dados são salvos no `localStorage` do navegador. Não há servidor, banco de dados ou conta de usuário. Use a função de backup para não perder seus dados.

---

## 🎨 Paleta de Cores (Apple-like)

| Cor | Hex | Uso |
|-----|-----|-----|
| Background | `#f5f5f7` | Fundo principal |
| Card | `#ffffff` | Cards e containers |
| Border | `#e8e8ed` | Bordas sutis |
| Text | `#1d1d1f` | Texto principal |
| Secondary | `#86868b` | Texto secundário |
| Accent | `#0071e3` | Azul Apple (ações) |
| Green | `#34c759` | BRL / positivo |
| Red | `#ff3b30` | Alertas / negativo |
| Orange | `#ff9500` | Bitcoin |
| Purple | `#af52de` | Registros |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

```bash
# Fork o projeto
# Crie uma branch para sua feature
git checkout -b feature/minha-feature

# Commit suas mudanças
git commit -m 'feat: adiciona nova feature'

# Push para a branch
git push origin feature/minha-feature

# Abra um Pull Request
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

- [Recharts](https://recharts.org/) — Biblioteca de gráficos
- [Lucide](https://lucide.dev/) — Ícones
- Apple — Inspiração de design

---

<div align="center">
  <sub>Feito com 💙 para traders que valorizam simplicidade</sub>
</div>
