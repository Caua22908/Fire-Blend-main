const express = require('express');
const router = express.Router();
const { Estoque } = require('../models');

router.get('/', async (req, res) => {
  const list = await Estoque.findAll();
  res.json(list);
});

router.get('/:id', async (req, res) => {
  const item = await Estoque.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Estoque not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const created = await Estoque.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const item = await Estoque.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Estoque not found' });
  await item.update(req.body);
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Estoque.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Estoque not found' });
  await item.destroy();
  res.json({ ok: true });
});

module.exports = router;
