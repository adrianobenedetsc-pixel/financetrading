# Guia de Contribuição

Obrigado por considerar contribuir com o **Trader Finance**! 🎉

## 🐛 Reportando Bugs

Se você encontrou um bug, por favor abra uma issue com:

1. **Descrição clara** do problema
2. **Passos para reproduzir** o comportamento
3. **Comportamento esperado** vs **comportamento atual**
4. **Screenshots** se aplicável
5. **Ambiente** (navegador, SO, versão do Node)

## 💡 Sugerindo Funcionalidades

Ideias são bem-vindas! Antes de abrir uma issue:

- Verifique se já não existe uma issue similar
- Descreva o caso de uso e o problema que resolve
- Seja específico sobre o comportamento esperado

## 🔧 Desenvolvendo

### Setup Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/trader-finance.git
cd trader-finance

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Padrões de Código

- **TypeScript** — Todo código deve ser tipado
- **Componentes funcionais** — Use hooks, não classes
- **Nomes descritivos** — Variáveis e funções com nomes claros
- **Comentários em português** — Mantenha consistência
- **Estilo Apple** — Siga a paleta de cores e espaçamentos existentes

### Estrutura de Commits

Use mensagens de commit claras:

```
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: ajustes de estilo/formatação
refactor: refatoração de código
chore: atualiza dependências
```

### Abrindo Pull Requests

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

### Checklist do PR

- [ ] Código segue os padrões do projeto
- [ ] Build passa sem erros (`npm run build`)
- [ ] Funcionalidade testada manualmente
- [ ] Documentação atualizada se necessário
- [ ] Sem arquivos desnecessários no commit

## 🎨 Design

O projeto segue a estética Apple:

- **Cores**: Use as variáveis do tema (`apple-accent`, `apple-green`, etc.)
- **Espaçamento**: Prefira `rounded-2xl` para cards, `p-6` ou `p-8` para padding
- **Tipografia**: SF Pro (via `-apple-system`), tracking-tight para títulos
- **Animações**: Use `animate-fade-in` para transições suaves

## 📦 Estrutura

```
src/
├── components/    # Componentes reutilizáveis (Layout, etc.)
├── pages/         # Páginas da aplicação
├── store/         # Hooks de estado e lógica de negócio
├── hooks/         # Hooks customizados (usePrices, etc.)
└── types/         # Definições TypeScript
```

## ❓ Dúvidas?

Abra uma issue com a label `question` ou entre em contato.

---

Obrigado por contribuir! 💙
