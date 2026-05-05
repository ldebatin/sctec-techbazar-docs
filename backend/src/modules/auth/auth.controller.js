// Controller de autenticação — delega para o service e formata a resposta HTTP
const authService = require('./auth.service');

async function register(req, res, next) {
  try {
    const { nome, email, senha } = req.body;
    const resultado = await authService.register(nome, email, senha);
    res.status(201).json(resultado);
  } catch (err) {
    if (err.message === 'Email já cadastrado.') {
      return res.status(409).json({ erro: err.message });
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, senha } = req.body;
    const resultado = await authService.login(email, senha);
    res.status(200).json(resultado);
  } catch (err) {
    if (err.message === 'Credenciais inválidas.') {
      return res.status(401).json({ erro: err.message });
    }
    next(err);
  }
}

module.exports = { register, login };
