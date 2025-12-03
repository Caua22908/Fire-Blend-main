// Importa módulos necessários
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Exemplo, sequelize } = require('./bd'); // importa bd.js

// Inicializa o app Express
const app = express();
const port = 3000;

// Middlewares
app.use(cors()); // permite acesso de outras origens
app.use(express.json()); // parse do JSON
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // pasta para arquivos

// Garante que a pasta de uploads exista
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Configura armazenamento de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Rota exemplo para inserir dados
app.post('/exemplo/inserir', upload.single('arquivo'), async (req, res) => {
  try {
    const novo = await Exemplo.create({
      nome: req.body.nome,
      descricao: req.body.descricao,
    });
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir.' });
  }
});

// Rota exemplo para listar dados
app.get('/exemplo', async (req, res) => {
  try {
    const lista = await Exemplo.findAll();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar.' });
  }
});

// Inicia servidor
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
