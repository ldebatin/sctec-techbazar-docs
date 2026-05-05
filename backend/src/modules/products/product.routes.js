// Rotas de produtos — listagem e detalhe são públicos; criação e remoção exigem autenticação
const { Router } = require('express');
const authMiddleware = require('../../shared/middlewares/auth.middleware');
const controller = require('./product.controller');

const router = Router();

router.get('/', controller.listar);
router.get('/:id', controller.detalhe);
router.post('/', authMiddleware, controller.criar);
router.delete('/:id', authMiddleware, controller.remover);

module.exports = router;
