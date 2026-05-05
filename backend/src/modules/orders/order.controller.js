// Controller de pedidos — criação a partir do carrinho e listagem do histórico
const orderService = require('./order.service');

async function criarPedido(req, res, next) {
  try {
    const { enderecoEntrega } = req.body;
    const pedido = await orderService.criarPedido(req.usuario.id, enderecoEntrega);
    res.status(201).json(pedido);
  } catch (err) {
    if (err.message === 'Carrinho vazio.') return res.status(400).json({ erro: err.message });
    next(err);
  }
}

async function listarPedidos(req, res, next) {
  try {
    const pedidos = await orderService.listarPedidos(req.usuario.id);
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
}

module.exports = { criarPedido, listarPedidos };
