// admin.js - front-end para área administrativa
// Checar se usuário está logado e é admin
const loggedClient = JSON.parse(localStorage.getItem('loggedClient') || 'null');
if (!loggedClient) {
  alert('Você precisa estar logado para acessar a área administrativa.');
  window.location.href = 'login.html';
} else if (loggedClient.role !== 'admin') {
  alert('Acesso negado. Apenas administradores podem acessar esta área.');
  window.location.href = 'index.html';
}

const panel = document.getElementById('panel');
const tabProdutos = document.getElementById('tab-produtos');
const tabClientes = document.getElementById('tab-clientes');
const tabVendas = document.getElementById('tab-vendas');

function setActiveTab(btn) {
  [tabProdutos, tabClientes, tabVendas].forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json().catch(() => null);
}

// Produtos
async function showProdutos() {
  setActiveTab(tabProdutos);
  panel.innerHTML = '<h2>Produtos</h2><div id="prod-actions"></div><div id="prod-list">Carregando...</div>';
  try {
    const produtos = await fetchJSON('/api/produtos');
    const list = document.getElementById('prod-list');
    const actions = document.getElementById('prod-actions');
    actions.innerHTML = `
      <h3>Adicionar produto</h3>
      <div class="form-row">
        <input id="p-nome" placeholder="Nome" />
        <input id="p-preco" placeholder="Preço (ex: 199.90)" />
      </div>
      <div class="form-row">
        <input id="p-colecao" placeholder="Coleção" />
        <input id="p-imagem" placeholder="Caminho da imagem" />
      </div>
      <button id="create-prod" class="small-btn">Criar</button>
      <hr />`;

    document.getElementById('create-prod').addEventListener('click', async () => {
      const nome = document.getElementById('p-nome').value.trim();
      const preco = parseFloat(document.getElementById('p-preco').value) || 0;
      const colecao = document.getElementById('p-colecao').value.trim();
      const imagem = document.getElementById('p-imagem').value.trim();
      if (!nome) return alert('Nome é obrigatório');
      try {
        const created = await fetchJSON('/api/produtos', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ nome, preco, colecao, imagem }) });
        alert('Produto criado');
        showProdutos();
      } catch (err) { alert('Erro: ' + err.message); }
    });

    if (!produtos || produtos.length === 0) return list.innerHTML = '<p>Nenhum produto cadastrado.</p>';

    let html = '<table><thead><tr><th>ID</th><th>Nome</th><th>Preço</th><th>Coleção</th><th>Ações</th></tr></thead><tbody>';
    for (const p of produtos) {
      html += `<tr><td>${p.id_produto}</td><td>${p.nome}</td><td>R$ ${Number(p.preco).toFixed(2)}</td><td>${p.colecao||''}</td><td>
        <button class="small-btn" data-id="${p.id_produto}" data-action="del">Remover</button>
      </td></tr>`;
    }
    html += '</tbody></table>';
    list.innerHTML = html;

    // attach delete handlers
    list.querySelectorAll('button[data-action="del"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Remover produto?')) return;
        const id = btn.dataset.id;
        try {
          await fetchJSON('/api/produtos/' + id, { method: 'DELETE' });
          alert('Produto removido');
          showProdutos();
        } catch (err) { alert('Erro: ' + err.message); }
      });
    });
  } catch (err) {
    panel.innerHTML = '<p>Erro ao carregar produtos: ' + err.message + '</p>';
  }
}

// Clientes
async function showClientes() {
  setActiveTab(tabClientes);
  panel.innerHTML = '<h2>Clientes</h2><div id="cli-list">Carregando...</div>';
  try {
    const clientes = await fetchJSON('/api/clientes');
    const list = document.getElementById('cli-list');
    if (!clientes || clientes.length === 0) return list.innerHTML = '<p>Nenhum cliente cadastrado.</p>';
    let html = '<table><thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Ações</th></tr></thead><tbody>';
    for (const c of clientes) {
      html += `<tr><td>${c.id_cliente}</td><td>${c.nome}</td><td>${c.email}</td><td>
        <button class="small-btn" data-id="${c.id_cliente}" data-action="delcli">Remover</button>
      </td></tr>`;
    }
    html += '</tbody></table>';
    list.innerHTML = html;
    list.querySelectorAll('button[data-action="delcli"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Remover cliente?')) return;
        const id = btn.dataset.id;
        try {
          await fetchJSON('/api/clientes/' + id, { method: 'DELETE' });
          alert('Cliente removido');
          showClientes();
        } catch (err) { alert('Erro: ' + err.message); }
      });
    });
  } catch (err) {
    panel.innerHTML = '<p>Erro ao carregar clientes: ' + err.message + '</p>';
  }
}

// Vendas
async function showVendas() {
  setActiveTab(tabVendas);
  panel.innerHTML = '<h2>Vendas</h2><div id="v-list">Carregando...</div>';
  try {
    const vendas = await fetchJSON('/api/vendas');
    const list = document.getElementById('v-list');
    if (!vendas || vendas.length === 0) return list.innerHTML = '<p>Nenhuma venda registrada.</p>';
    let html = '<table><thead><tr><th>ID</th><th>Cliente ID</th><th>Produto ID</th><th>Forma</th><th>Data</th></tr></thead><tbody>';
    for (const v of vendas) {
      html += `<tr><td>${v.id_venda}</td><td>${v.cliente_id_cliente}</td><td>${v.produto_id_produto}</td><td>${v.forma_pagamento||''}</td><td>${v.createdAt||''}</td></tr>`;
    }
    html += '</tbody></table>';
    list.innerHTML = html;
  } catch (err) {
    panel.innerHTML = '<p>Erro ao carregar vendas: ' + err.message + '</p>';
  }
}

// attach tabs
if (tabProdutos) tabProdutos.addEventListener('click', showProdutos);
if (tabClientes) tabClientes.addEventListener('click', showClientes);
if (tabVendas) tabVendas.addEventListener('click', showVendas);

// initial
showProdutos();
