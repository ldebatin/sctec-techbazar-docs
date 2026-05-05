// Rotas do perfil do usuário (todas autenticadas)
const { Router } = require('express');
const authMiddleware = require('../../shared/middlewares/auth.middleware');
const controller = require('./user.controller');

const router = Router();

router.use(authMiddleware);

router.get('/me', controller.getPerfil);
router.put('/me', controller.updatePerfil);

module.exports = router;
