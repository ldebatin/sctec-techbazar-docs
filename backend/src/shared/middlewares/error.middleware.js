// Handler global de erros — captura qualquer erro não tratado nos controllers
function errorMiddleware(err, req, res, next) {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor. Tente novamente mais tarde.' });
}

module.exports = errorMiddleware;
