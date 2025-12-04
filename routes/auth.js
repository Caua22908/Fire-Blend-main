const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Cliente } = require('../models');
const { sequelize } = require('../db_mysql');
const { fn, col } = require('sequelize');

// POST /api/auth  -> { email, senha }
router.post('/', async (req, res) => {
  const { email, senha } = req.body || {};
  if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  try {
    // Case-insensitive lookup for email
    const cliente = await Cliente.findOne({
      where: sequelize.where(fn('lower', col('email')), email.toLowerCase()),
    });
    if (!cliente) {
      console.warn('Auth failed: user not found', email);
      return res.status(401).json({ error: 'Credenciais inválidas', reason: 'no_user' });
    }
    // Plaintext comparison (per user request)
    if (cliente.senha !== senha) {
      console.warn('Auth failed: bad password for', email);
      return res.status(401).json({ error: 'Credenciais inválidas', reason: 'bad_password' });
    }
    const obj = cliente.toJSON();
    delete obj.senha;
    console.log('Auth success for', email, '(role=' + obj.role + ')');
    res.json(obj);
  } catch (err) {
    console.error('Auth error', err && err.stack ? err.stack : err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
