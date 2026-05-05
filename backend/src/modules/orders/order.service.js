// Criação de pedidos a partir do carrinho ativo; limpa o carrinho após confirmar
const prisma = require('../../shared/database/prisma');

async function criarPedido(compradorId, enderecoEntrega) {
  const carrinho = await prisma.carrinho.findUnique({
    where: { compradorId },
    include: { itens: { include: { produto: true } } },
  });

  if (!carrinho || carrinho.itens.length === 0) {
    throw new Error('Carrinho vazio.');
  }

  const total = carrinho.itens.reduce((acc, item) => {
    return acc + Number(item.produto.preco) * item.quantidade;
  }, 0);

  const pedido = await prisma.pedido.create({
    data: {
      compradorId,
      total,
      enderecoEntrega,
      itens: {
        create: carrinho.itens.map((item) => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          precoUnitario: item.produto.preco,
        })),
      },
    },
    include: { itens: { include: { produto: true } } },
  });

  // Limpa o carrinho após criar o pedido
  await prisma.itemCarrinho.deleteMany({ where: { carrinhoId: carrinho.id } });

  return pedido;
}

async function listarPedidos(compradorId) {
  return prisma.pedido.findMany({
    where: { compradorId },
    include: { itens: { include: { produto: true } } },
    orderBy: { criadoEm: 'desc' },
  });
}

module.exports = { criarPedido, listarPedidos };
