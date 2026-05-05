// Controller do carrinho — todas as operações exigem autenticação (via rota)
const cartService = require('./cart.service');

async function getCarrinho(req, res, next) {
  try {
    const carrinho = await cartService.getCarrinho(req.usuario.id);
    res.json(carrinho);
  } catch (err) {
    next(err);
  }
}

async function adicionarItem(req, res, next) {
  try {
    const { produtoId, quantidade } = req.body;
    const item = await cartService.adicionarItem(req.usuario.id, produtoId, quantidade);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

async function removerItem(req, res, next) {
  try {
    await cartService.removerItem(req.usuario.id, Number(req.params.produtoId));
    res.status(204).send();
  } catch (err) {
    if (err.message.includes('não encontrado')) return res.status(404).json({ erro: err.message });
    next(err);
  }
}

module.exports = { getCarrinho, adicionarItem, removerItem };
