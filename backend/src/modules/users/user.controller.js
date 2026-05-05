// Controller de usuários — perfil do usuário autenticado
const userService = require('./user.service');

async function getPerfil(req, res, next) {
  try {
    const usuario = await userService.getPerfil(req.usuario.id);
    res.json(usuario);
  } catch (err) {
    next(err);
  }
}

async function updatePerfil(req, res, next) {
  try {
    const usuario = await userService.updatePerfil(req.usuario.id, req.body);
    res.json(usuario);
  } catch (err) {
    next(err);
  }
}

module.exports = { getPerfil, updatePerfil };
