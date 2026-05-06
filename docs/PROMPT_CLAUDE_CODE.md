# PROMPT — TechBazar (Claude Code)

Crie um projeto completo chamado **TechBazar**, um marketplace simplificado de
eletrônicos usados (estilo OLX/Mercado Livre enxuto).

---

## ESTRUTURA DE PASTAS

Crie exatamente esta estrutura:

```
techbazar/
├── docs/
│   ├── ADR.md
│   └── DIAGRAMAS.md
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.service.js
│   │   │   │   └── auth.routes.js
│   │   │   ├── users/
│   │   │   │   ├── user.controller.js
│   │   │   │   ├── user.service.js
│   │   │   │   └── user.routes.js
│   │   │   ├── products/
│   │   │   │   ├── product.controller.js
│   │   │   │   ├── product.service.js
│   │   │   │   └── product.routes.js
│   │   │   ├── cart/
│   │   │   │   ├── cart.controller.js
│   │   │   │   ├── cart.service.js
│   │   │   │   └── cart.routes.js
│   │   │   └── orders/
│   │   │       ├── order.controller.js
│   │   │       ├── order.service.js
│   │   │       └── order.routes.js
│   │   ├── shared/
│   │   │   ├── database/
│   │   │   │   └── prisma.js
│   │   │   ├── middlewares/
│   │   │   │   ├── auth.middleware.js
│   │   │   │   └── error.middleware.js
│   │   │   └── utils/
│   │   │       └── jwt.js
│   │   └── app.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env.example
│   └── package.json
└── frontend/
    └── index.html
```

---

## PASSO 1 — docs/ADR.md

Crie o arquivo com o seguinte conteúdo:

```markdown
# ADR-001: Arquitetura do TechBazar

## Status
Aceito

## Contexto
Marketplace simplificado de eletrônicos usados com:
- Cadastro de usuários
- Listagem de produtos
- Carrinho de compras
- Fluxo de checkout

## Decisão: Monólito Modular

### Stack
| Camada       | Tecnologia              |
|-------------|--------------------------|
| Backend     | Node.js + Express        |
| Banco       | PostgreSQL + Prisma ORM  |
| Auth        | JWT + bcrypt             |
| Frontend    | HTML + Tailwind + Vanilla JS |

### Por que Monólito Modular?
- Equipe pequena, projeto em fase inicial
- Simples de fazer deploy (um único processo)
- Cada módulo pode virar microsserviço no futuro

### Por que não Microsserviços?
- Complexidade desnecessária para o volume atual
- Overhead operacional alto para equipe pequena

## Consequências
- Deploy simples em Railway/Render
- Fácil onboarding
- Escala limitada (aceitável para MVP)
```

---

## PASSO 2 — docs/DIAGRAMAS.md

Crie o arquivo com dois diagramas Mermaid:

### Diagrama ER:
Entidades: Usuario, Produto, Carrinho, ItemCarrinho, Pedido, ItemPedido
- Usuario tem muitos Produtos (vendedor)
- Usuario tem um Carrinho
- Carrinho tem muitos ItemCarrinho
- ItemCarrinho referencia Produto
- Usuario tem muitos Pedidos
- Pedido tem muitos ItemPedido
- ItemPedido referencia Produto

### Diagrama de Fluxo:
Fluxo do usuário buscando produto e adicionando ao carrinho:
Acessa home → busca produto → produto encontrado? → vê detalhes → está logado? → adiciona ao carrinho → finaliza compra

---

## PASSO 3 — backend/prisma/schema.prisma

Crie o schema Prisma com os seguintes models:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        Int       @id @default(autoincrement())
  nome      String
  email     String    @unique
  senhaHash String    @map("senha_hash")
  telefone  String?
  cidade    String?
  estado    String?
  criadoEm DateTime  @default(now()) @map("criado_em")

  produtos  Produto[]
  carrinho  Carrinho?
  pedidos   Pedido[]

  @@map("usuarios")
}

model Produto {
  id          Int      @id @default(autoincrement())
  vendedorId  Int      @map("vendedor_id")
  titulo      String
  descricao   String?
  preco       Decimal  @db.Decimal(10, 2)
  categoria   String
  condicao    String
  status      String   @default("ativo")
  imagemUrl   String?  @map("imagem_url")
  criadoEm   DateTime @default(now()) @map("criado_em")

  vendedor      Usuario        @relation(fields: [vendedorId], references: [id])
  itensCarrinho ItemCarrinho[]
  itensPedido   ItemPedido[]

  @@map("produtos")
}

model Carrinho {
  id          Int      @id @default(autoincrement())
  compradorId Int      @unique @map("comprador_id")
  atualizadoEm DateTime @updatedAt @map("atualizado_em")

  comprador Usuario        @relation(fields: [compradorId], references: [id])
  itens     ItemCarrinho[]

  @@map("carrinhos")
}

model ItemCarrinho {
  id         Int @id @default(autoincrement())
  carrinhoId Int @map("carrinho_id")
  produtoId  Int @map("produto_id")
  quantidade Int @default(1)

  carrinho Carrinho @relation(fields: [carrinhoId], references: [id])
  produto  Produto  @relation(fields: [produtoId], references: [id])

  @@map("itens_carrinho")
}

model Pedido {
  id               Int      @id @default(autoincrement())
  compradorId      Int      @map("comprador_id")
  total            Decimal  @db.Decimal(10, 2)
  status           String   @default("pendente")
  enderecoEntrega  String   @map("endereco_entrega")
  criadoEm        DateTime @default(now()) @map("criado_em")

  comprador Usuario      @relation(fields: [compradorId], references: [id])
  itens     ItemPedido[]

  @@map("pedidos")
}

model ItemPedido {
  id            Int     @id @default(autoincrement())
  pedidoId      Int     @map("pedido_id")
  produtoId     Int     @map("produto_id")
  quantidade    Int
  precoUnitario Decimal @db.Decimal(10, 2) @map("preco_unitario")

  pedido  Pedido  @relation(fields: [pedidoId], references: [id])
  produto Produto @relation(fields: [produtoId], references: [id])

  @@map("itens_pedido")
}
```

---

## PASSO 4 — backend/package.json

```json
{
  "name": "techbazar-backend",
  "version": "1.0.0",
  "description": "API do TechBazar — marketplace de eletrônicos usados",
  "main": "src/app.js",
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev"
  },
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "prisma": "^5.0.0"
  }
}
```

---

## PASSO 5 — backend/.env.example

```env
DATABASE_URL="postgresql://user:password@localhost:5432/techbazar"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
```

---

## PASSO 6 — backend/src/app.js

Crie o entry point Express com:
- Importação do dotenv, express, cors
- Registro de todas as rotas: /api/auth, /api/users, /api/products, /api/cart, /api/orders
- Middleware de erro global
- app.listen na porta do .env ou 3000
- Rota GET / retornando `{ message: "TechBazar API rodando!" }`

---

## PASSO 7 — Módulo AUTH

### auth.routes.js
- POST /api/auth/register
- POST /api/auth/login

### auth.service.js
- `register(nome, email, senha)` — cria usuário com bcrypt hash, retorna JWT
- `login(email, senha)` — valida senha, retorna JWT

### auth.controller.js
- Chama o service, retorna 201 no register e 200 no login com `{ token, usuario }`

---

## PASSO 8 — Módulo PRODUCTS

### product.routes.js
- GET /api/products — lista todos (query params: categoria, busca)
- GET /api/products/:id — detalhe do produto
- POST /api/products — cria anúncio (autenticado)
- DELETE /api/products/:id — remove anúncio (autenticado, só o dono)

### product.service.js
Implementar cada operação usando Prisma.

### product.controller.js
Chamar o service e retornar os status HTTP corretos.

---

## PASSO 9 — Módulo CART

### cart.routes.js (todas autenticadas)
- GET /api/cart — retorna carrinho do usuário logado
- POST /api/cart/items — adiciona produto ao carrinho
- DELETE /api/cart/items/:produtoId — remove item do carrinho

### cart.service.js
- Criar carrinho automaticamente se não existir (upsert)
- Incrementar quantidade se produto já estiver no carrinho

---

## PASSO 10 — Módulo ORDERS

### order.routes.js (todas autenticadas)
- POST /api/orders — cria pedido a partir do carrinho atual
- GET /api/orders — lista pedidos do usuário

### order.service.js
- Buscar itens do carrinho
- Calcular total
- Criar Pedido + ItensPedido
- Limpar carrinho após criação do pedido

---

## PASSO 11 — Middlewares

### auth.middleware.js
Verificar o JWT do header `Authorization: Bearer <token>`.
Adicionar `req.usuario` com os dados do token decodificado.

### error.middleware.js
Handler global de erros com status 500 e mensagem amigável.

---

## PASSO 12 — frontend/index.html

Crie uma Home Page completa com HTML + Tailwind CSS (via CDN) + Vanilla JS:

**Layout:**
- Navbar com logo "TechBazar", barra de busca centralizada, botões "Entrar" e "Anunciar"
- Filtros de categoria em pills horizontais: Todos, Smartphones, Notebooks, Games, TVs, Áudio, Câmeras, Tablets
- Banner hero escuro com título, subtítulo e estatísticas (3.2K anúncios, 98% confiáveis, R$0 taxa)
- Grid de produtos com cards (emoji + título + cidade + preço + botão "Adicionar ao Carrinho")
- Footer simples

**Funcionalidades JS:**
- Array de 8 produtos mock com: id, titulo, preco, city, condition, category, emoji
- Renderizar cards dinamicamente
- Filtro por categoria ao clicar nos pills
- Busca por texto no input (filtrar pelo título)
- Contador de itens no carrinho com feedback visual ao adicionar

**Visual:**
- Tema escuro (background #0f1117)
- Cor primária verde (#00c896)
- Fonte Syne (títulos) + DM Sans (corpo) via Google Fonts
- Cards com hover elevado e borda verde

---

## OBSERVAÇÕES FINAIS

- Todos os arquivos devem ter comentários explicando o que fazem
- O código deve ser limpo e organizado
- Usar async/await em todas as operações assíncronas
- Tratar erros com try/catch em todos os controllers
- O frontend deve funcionar standalone (sem precisar do backend rodando)
