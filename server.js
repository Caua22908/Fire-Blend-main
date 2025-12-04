const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve front-end static files (the existing HTML/CSS/JS in repository)
app.use(express.static(path.join(__dirname)));

// API routes
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/produtos', require('./routes/produtos'));
app.use('/api/estoques', require('./routes/estoques'));
app.use('/api/quantidades', require('./routes/quantidades'));
app.use('/api/vendas', require('./routes/vendas'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
