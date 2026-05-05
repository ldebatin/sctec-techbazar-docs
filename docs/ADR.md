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
