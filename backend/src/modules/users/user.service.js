// Operações sobre o perfil do usuário autenticado
const prisma = require('../../shared/database/prisma');

async function getPerfil(id) {
  const usuario = await prisma.usuario.findUnique({
    where: { id },
    select: { id: true, nome: true, email: true, telefone: true, cidade: true, estado: true, criadoEm: true },
  });
  if (!usuario) throw new Error('Usuário não encontrado.');
  return usuario;
}

async function updatePerfil(id, dados) {
  const { nome, telefone, cidade, estado } = dados;
  const usuario = await prisma.usuario.update({
    where: { id },
    data: { nome, telefone, cidade, estado },
    select: { id: true, nome: true, email: true, telefone: true, cidade: true, estado: true },
  });
  return usuario;
}

module.exports = { getPerfil, updatePerfil };
