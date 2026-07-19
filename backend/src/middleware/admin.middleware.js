function requireAdmin(req, res, next) {
  const receivedKey = req.headers["x-admin-key"];
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    console.error("ADMIN_API_KEY não está configurada.");

    return res.status(500).json({
      error: "A autenticação de administração não está configurada."
    });
  }

  if (!receivedKey || receivedKey !== expectedKey) {
    return res.status(401).json({
      error: "Não tens autorização para realizar esta operação."
    });
  }

  next();
}

module.exports = requireAdmin;