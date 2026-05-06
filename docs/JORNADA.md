# Jornada de Desenvolvimento — TechBazar

Como a IA foi usada em cada etapa para construir este projeto do zero.

---

## Contexto

Projeto avaliativo do curso **IA para Desenvolvedores — SENAI**.

O desafio proposto era criar um mini-projeto de marketplace de eletrônicos usados, entregando:
- Decisão arquitetural documentada (ADR)
- Diagramas ER e de fluxo
- Mockup da home page

---

## Etapa 1 — Entendendo o desafio com o Claude (chat)

O primeiro contato com a IA foi via **Claude.ai** (interface web). O enunciado do desafio foi compartilhado e o Claude ajudou a:

- Interpretar o que era esperado em cada entregável
- Gerar o `ADR.md` com a decisão arquitetural de **Monólito Modular** e justificativas claras para a escolha de Node.js + Express + PostgreSQL + Prisma
- Gerar o `DIAGRAMAS.md` com dois diagramas em **Mermaid**:
  - Diagrama ER com as entidades: Usuário, Produto, Carrinho, Item do Carrinho, Pedido e Item do Pedido
  - Diagrama de Fluxo do usuário buscando e adicionando produtos ao carrinho
- Gerar o `index.html` — mockup da home page com Tailwind CSS, filtros por categoria, grid de produtos mock e feedback visual do carrinho

Nesta etapa a IA atuou como **parceiro de raciocínio**: ajudou a estruturar as decisões técnicas antes de qualquer linha de código real.

---

## Etapa 2 — Criando o prompt para o Claude Code

Com os entregáveis do desafio prontos, o grupo decidiu ir além: **implementar o projeto completo** com backend funcional.

O Claude (chat) foi usado para criar um **prompt detalhado** (`PROMPT_CLAUDE_CODE.md`) contendo todas as instruções necessárias para que o **Claude Code** (IA no terminal) construísse o projeto inteiro de forma autônoma, incluindo:

- Estrutura exata de pastas
- Schema Prisma completo com 6 models
- Todos os módulos do backend (auth, users, products, cart, orders)
- Middlewares, utilitários e entry point
- Frontend completo com funcionalidades JS

O prompt funcionou como uma **especificação técnica** passada de uma IA para outra.

---

## Etapa 3 — Construção do projeto com o Claude Code (terminal)

O arquivo `PROMPT_CLAUDE_CODE.md` foi entregue ao **Claude Code** diretamente no terminal.

A IA executou todas as etapas autonomamente:

1. Criou a estrutura de pastas completa
2. Gerou os 26 arquivos do projeto (backend + frontend + docs)
3. Adaptou o banco de **PostgreSQL para SQLite** ao identificar que não havia banco instalado na máquina
4. Rodou `npm install` e `prisma migrate` para subir o ambiente
5. Iniciou o servidor e confirmou que a API respondia em `http://localhost:3000`
6. Abriu o frontend no navegador

Depois da entrega inicial, o grupo pediu melhorias incrementais e o Claude Code implementou:

- **Drawer lateral do carrinho** com lista de itens, controle de quantidade (+/−), remoção e total calculado em tempo real
- **Modal de autenticação** com abas Login / Criar conta, validações inline e sessão persistida via `localStorage`

---

## Etapa 4 — Versionamento no GitHub

O projeto foi publicado neste repositório para que todos os integrantes do grupo pudessem clonar e executar sem configuração adicional.

O repositório inclui `node_modules`, `.env` e o banco SQLite já migrado — qualquer pessoa que clonar consegue rodar com um único comando:

```bash
node backend/src/app.js
```

---

## Aprendizados

| O que aprendemos | Como a IA ajudou |
|------------------|-----------------|
| Documentar decisões arquiteturais (ADR) | Gerou o documento e explicou cada escolha |
| Modelagem de dados com Prisma | Criou o schema completo com relacionamentos |
| Estrutura de API REST modular | Gerou controllers, services e rotas separados |
| Autenticação com JWT | Implementou middleware de proteção de rotas |
| Frontend com Tailwind sem framework | Criou componentes visuais (drawer, modal, cards) |
| Prompt engineering | Aprendemos a escrever prompts estruturados para obter código funcional |

---

## Arquivos gerados pela IA

| Arquivo | Ferramenta |
|---------|-----------|
| `docs/ADR.md` | Claude (chat) |
| `docs/DIAGRAMAS.md` | Claude (chat) |
| `PROMPT_CLAUDE_CODE.md` | Claude (chat) |
| Todo o restante do projeto | Claude Code (terminal) |
