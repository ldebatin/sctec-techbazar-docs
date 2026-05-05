// Regras de negócio de autenticação: registro e login de usuários
const bcrypt = require('bcryptjs');
const prisma = require('../../shared/database/prisma');
const { gerarToken } = require('../../shared/utils/jwt');

async function register(nome, email, senha) {
  const existente = await prisma.usuario.findUnique({ where: { email } });
  if (existente) {
    throw new Error('Email já cadastrado.');
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: { nome, email, senhaHash },
    select: { id: true, nome: true, email: true, criadoEm: true },
  });

  const token = gerarToken({ id: usuario.id, email: usuario.email });
  return { token, usuario };
}

async function login(email, senha) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) {
    throw new Error('Credenciais inválidas.');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
  if (!senhaValida) {
    throw new Error('Credenciais inválidas.');
  }

  const token = gerarToken({ id: usuario.id, email: usuario.email });
  const { senhaHash, ...usuarioSemSenha } = usuario;
  return { token, usuario: usuarioSemSenha };
}

module.exports = { register, login };
