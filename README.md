# TechBazar

Marketplace simplificado de eletrônicos usados desenvolvido como projeto avaliativo do curso **IA para Desenvolvedores — SENAI**.

---

## Sobre o projeto

O TechBazar simula uma plataforma de compra e venda de eletrônicos usados (estilo OLX/Mercado Livre enxuto), construída com arquitetura de **Monólito Modular**.

---

## Stack

| Camada    | Tecnologia                  |
|-----------|-----------------------------|
| Backend   | Node.js + Express           |
| Banco     | SQLite + Prisma ORM         |
| Auth      | JWT + bcrypt                |
| Frontend  | HTML + Tailwind CSS + Vanilla JS |

---

## Estrutura

```
techbazar/
├── docs/
│   ├── ADR.md           # Decisão arquitetural
│   ├── DIAGRAMAS.md     # Diagramas ER e de fluxo (Mermaid)
│   └── JORNADA.md       # Como chegamos a este projeto
├── backend/
│   ├── src/
│   │   ├── modules/     # auth, users, products, cart, orders
│   │   ├── shared/      # database, middlewares, utils
│   │   └── app.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   └── package.json
└── frontend/
    └── index.html
```

---

## Como rodar

O repositório já inclui `node_modules`, `.env` e banco SQLite prontos. Basta:

```bash
# Iniciar o backend
node backend/src/app.js
```

Abrir `frontend/index.html` no navegador.

A API estará disponível em `http://localhost:3000`.

---

## Endpoints da API

| Método | Rota                        | Auth | Descrição                  |
|--------|-----------------------------|------|----------------------------|
| GET    | /                           | —    | Health check               |
| POST   | /api/auth/register          | —    | Criar conta                |
| POST   | /api/auth/login             | —    | Login                      |
| GET    | /api/products               | —    | Listar produtos            |
| GET    | /api/products/:id           | —    | Detalhe do produto         |
| POST   | /api/products               | JWT  | Criar anúncio              |
| DELETE | /api/products/:id           | JWT  | Remover anúncio            |
| GET    | /api/cart                   | JWT  | Ver carrinho               |
| POST   | /api/cart/items             | JWT  | Adicionar item             |
| DELETE | /api/cart/items/:produtoId  | JWT  | Remover item               |
| POST   | /api/orders                 | JWT  | Finalizar pedido           |
| GET    | /api/orders                 | JWT  | Listar pedidos             |

---

## Funcionalidades do Frontend

- Listagem de produtos com filtro por categoria e busca em tempo real
- Drawer lateral de carrinho com controle de quantidade e remoção de itens
- Modal de autenticação com abas Login / Criar conta
- Sessão persistida via `localStorage`
- Tema escuro com design system próprio (fonte Syne + DM Sans, cor primária `#00c896`)

---

## Contexto

Projeto desenvolvido para o desafio avaliativo do curso **IA para Desenvolvedores** do SENAI.  
Veja `docs/JORNADA.md` para entender como a IA foi usada em cada etapa do desenvolvimento.
