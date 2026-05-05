// Utilitários para geração e verificação de tokens JWT
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'fallback_secret';

function gerarToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

function verificarToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { gerarToken, verificarToken };
