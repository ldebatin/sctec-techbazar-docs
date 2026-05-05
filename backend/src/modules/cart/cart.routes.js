// Rotas do carrinho — todas protegidas por autenticação
const { Router } = require('express');
const authMiddleware = require('../../shared/middlewares/auth.middleware');
const controller = require('./cart.controller');

const router = Router();

router.use(authMiddleware);

router.get('/', controller.getCarrinho);
router.post('/items', controller.adicionarItem);
router.delete('/items/:produtoId', controller.removerItem);

module.exports = router;
