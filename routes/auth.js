const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Cliente } = require("../models");
const { sequelize } = require("../db_mysql");

// POST /api/auth  -> { email, senha }
router.post("/", async (req, res) => {
  const { email, senha } = req.body || {};
  if (!email || !senha)
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  try {
    // Lookup by email (MySQL default collation is case-insensitive)
    const cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) {
      console.warn("Auth failed: user not found", email);
      return res
        .status(401)
        .json({ error: "Credenciais inválidas", reason: "no_user" });
    }
    // Plaintext comparison (per user request)
    if (cliente.senha !== senha) {
      console.warn("Auth failed: bad password for", email);
      return res
        .status(401)
        .json({ error: "Credenciais inválidas", reason: "bad_password" });
    }
    const obj = cliente.toJSON();
    delete obj.senha;
    // Ensure `role` is present in the response so front-end can check admin access.
    obj.role = obj.role || (obj.email === 'admin@fireblend.com' ? 'admin' : 'user');
    console.log('Auth success for', email, '(role=' + obj.role + ')');
    res.json(obj);
  } catch (err) {
    console.error("Auth error", err);
    try {
      console.error(
        "Sequelize error details:",
        JSON.stringify(err, Object.getOwnPropertyNames(err)),
      );
    } catch (e) {
      /* ignore stringify errors */
    }
    res
      .status(500)
      .json({ error: err && err.message ? err.message : String(err) });
  }
});

module.exports = router;
