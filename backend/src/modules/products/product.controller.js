// Controller de produtos — lista, detalhe, criação e remoção de anúncios
const productService = require('./product.service');

async function listar(req, res, next) {
  try {
    const { categoria, busca } = req.query;
    const produtos = await productService.listar({ categoria, busca });
    res.json(produtos);
  } catch (err) {
    next(err);
  }
}

async function detalhe(req, res, next) {
  try {
    const produto = await productService.buscarPorId(Number(req.params.id));
    res.json(produto);
  } catch (err) {
    if (err.message === 'Produto não encontrado.') return res.status(404).json({ erro: err.message });
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const produto = await productService.criar(req.usuario.id, req.body);
    res.status(201).json(produto);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await productService.remover(Number(req.params.id), req.usuario.id);
    res.status(204).send();
  } catch (err) {
    if (err.message === 'Produto não encontrado.') return res.status(404).json({ erro: err.message });
    if (err.message === 'Sem permissão para remover este anúncio.') return res.status(403).json({ erro: err.message });
    next(err);
  }
}

module.exports = { listar, detalhe, criar, remover };
