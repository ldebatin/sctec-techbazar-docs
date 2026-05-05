// Gerencia o carrinho do usuário: cria automaticamente se não existir, incrementa quantidades
const prisma = require('../../shared/database/prisma');

async function getCarrinho(compradorId) {
  const carrinho = await prisma.carrinho.upsert({
    where: { compradorId },
    create: { compradorId },
    update: {},
    include: {
      itens: {
        include: { produto: true },
      },
    },
  });
  return carrinho;
}

async function adicionarItem(compradorId, produtoId, quantidade = 1) {
  const carrinho = await prisma.carrinho.upsert({
    where: { compradorId },
    create: { compradorId },
    update: {},
  });

  // Incrementa se o produto já existir no carrinho
  const itemExistente = await prisma.itemCarrinho.findFirst({
    where: { carrinhoId: carrinho.id, produtoId },
  });

  if (itemExistente) {
    return prisma.itemCarrinho.update({
      where: { id: itemExistente.id },
      data: { quantidade: itemExistente.quantidade + quantidade },
      include: { produto: true },
    });
  }

  return prisma.itemCarrinho.create({
    data: { carrinhoId: carrinho.id, produtoId, quantidade },
    include: { produto: true },
  });
}

async function removerItem(compradorId, produtoId) {
  const carrinho = await prisma.carrinho.findUnique({ where: { compradorId } });
  if (!carrinho) throw new Error('Carrinho não encontrado.');

  const item = await prisma.itemCarrinho.findFirst({
    where: { carrinhoId: carrinho.id, produtoId },
  });
  if (!item) throw new Error('Item não encontrado no carrinho.');

  return prisma.itemCarrinho.delete({ where: { id: item.id } });
}

module.exports = { getCarrinho, adicionarItem, removerItem };
