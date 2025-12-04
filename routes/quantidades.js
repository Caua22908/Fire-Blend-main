const express = require('express');
const router = express.Router();
const { Quantidade } = require('../models');

router.get('/', async (req, res) => {
  const list = await Quantidade.findAll();
  res.json(list);
});

router.get('/:produtoId/:estoqueId', async (req, res) => {
  const item = await Quantidade.findOne({ where: { produto_id_produto: req.params.produtoId, estoque_id_estoque: req.params.estoqueId } });
  if (!item) return res.status(404).json({ error: 'Quantidade not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const created = await Quantidade.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:produtoId/:estoqueId', async (req, res) => {
  const item = await Quantidade.findOne({ where: { produto_id_produto: req.params.produtoId, estoque_id_estoque: req.params.estoqueId } });
  if (!item) return res.status(404).json({ error: 'Quantidade not found' });
  await item.update(req.body);
  res.json(item);
});

router.delete('/:produtoId/:estoqueId', async (req, res) => {
  const item = await Quantidade.findOne({ where: { produto_id_produto: req.params.produtoId, estoque_id_estoque: req.params.estoqueId } });
  if (!item) return res.status(404).json({ error: 'Quantidade not found' });
  await item.destroy();
  res.json({ ok: true });
});

module.exports = router;
