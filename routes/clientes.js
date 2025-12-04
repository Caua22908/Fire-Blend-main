const express = require('express');
const router = express.Router();
const { Cliente } = require('../models');

// List all clientes
router.get('/', async (req, res) => {
  const list = await Cliente.findAll();
  // never expose senha
  const safe = list.map((c) => {
    const obj = c.toJSON();
    delete obj.senha;
    return obj;
  });
  res.json(safe);
});

// Get by id
router.get('/:id', async (req, res) => {
  const item = await Cliente.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Cliente not found' });
  const obj = item.toJSON();
  delete obj.senha;
  res.json(obj);
});

// Create
router.post('/', async (req, res) => {
  try {
    // NOTE: storing senha exactly as provided (plaintext) per user request
    const created = await Cliente.create(req.body);
    const obj = created.toJSON();
    // do not include senha in API responses for safety
    delete obj.senha;
    res.status(201).json(obj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  const item = await Cliente.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Cliente not found' });
  await item.update(req.body);
  res.json(item);
});

// Delete
router.delete('/:id', async (req, res) => {
  const item = await Cliente.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Cliente not found' });
  await item.destroy();
  res.json({ ok: true });
});

module.exports = router;
