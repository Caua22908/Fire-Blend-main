const express = require('express');
const router = express.Router();
const { Venda, Cliente, Produto } = require('../models');

router.get('/', async (req, res) => {
  const list = await Venda.findAll();
  res.json(list);
});

router.get('/:id', async (req, res) => {
  const item = await Venda.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Venda not found' });
  res.json(item);
});

// Create a sale: ensure cliente and produto exist
router.post('/', async (req, res) => {
  const { cliente_id_cliente, produto_id_produto, forma_pagamento } = req.body;
  try {
    const cliente = await Cliente.findByPk(cliente_id_cliente);
    if (!cliente) return res.status(400).json({ error: 'Cliente not found' });
    const produto = await Produto.findByPk(produto_id_produto);
    if (!produto) return res.status(400).json({ error: 'Produto not found' });
    const created = await Venda.create({ cliente_id_cliente, produto_id_produto, forma_pagamento });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const item = await Venda.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Venda not found' });
  await item.update(req.body);
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Venda.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Venda not found' });
  await item.destroy();
  res.json({ ok: true });
});

module.exports = router;
