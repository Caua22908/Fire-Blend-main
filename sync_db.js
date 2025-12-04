// Script opcional para sincronizar/crear tabelas no banco MySQL
const { sequelize, Cliente, Produto, Estoque, Quantidade, Venda } = require('./models');

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Estrutura do banco sincronizada (alter: true).');
    process.exit(0);
  } catch (err) {
    console.error('❌ Falha ao sincronizar o banco:');
    // Mensagens e detalhes adicionais do erro do Sequelize
    try { console.error('Error.message:', err.message); } catch(e){}
    try { console.error('Error.name:', err.name); } catch(e){}
    try { console.error('Error.sql:', err.sql); } catch(e){}
    try { console.error('Error.original:', err.original); } catch(e){}
    try { console.error('Full stack:'); console.error(err && err.stack ? err.stack : err); } catch(e){}
    process.exit(1);
  }
})();
