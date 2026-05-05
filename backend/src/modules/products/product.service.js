// Operações CRUD de produtos com suporte a filtros por categoria e busca textual
const prisma = require('../../shared/database/prisma');

async function listar({ categoria, busca }) {
  const where = { status: 'ativo' };

  if (categoria) where.categoria = categoria;
  if (busca) where.titulo = { contains: busca, mode: 'insensitive' };

  return prisma.produto.findMany({
    where,
    include: { vendedor: { select: { id: true, nome: true, cidade: true, estado: true } } },
    orderBy: { criadoEm: 'desc' },
  });
}

async function buscarPorId(id) {
  const produto = await prisma.produto.findUnique({
    where: { id },
    include: { vendedor: { select: { id: true, nome: true, cidade: true, estado: true } } },
  });
  if (!produto) throw new Error('Produto não encontrado.');
  return produto;
}

async function criar(vendedorId, dados) {
  const { titulo, descricao, preco, categoria, condicao, imagemUrl } = dados;
  return prisma.produto.create({
    data: { vendedorId, titulo, descricao, preco, categoria, condicao, imagemUrl },
  });
}

async function remover(id, vendedorId) {
  const produto = await prisma.produto.findUnique({ where: { id } });
  if (!produto) throw new Error('Produto não encontrado.');
  if (produto.vendedorId !== vendedorId) throw new Error('Sem permissão para remover este anúncio.');

  return prisma.produto.delete({ where: { id } });
}

module.exports = { listar, buscarPorId, criar, remover };
