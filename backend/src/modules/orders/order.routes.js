// Rotas de pedidos — todas protegidas por autenticação
const { Router } = require('express');
const authMiddleware = require('../../shared/middlewares/auth.middleware');
const controller = require('./order.controller');

const router = Router();

router.use(authMiddleware);

router.post('/', controller.criarPedido);
router.get('/', controller.listarPedidos);

module.exports = router;
