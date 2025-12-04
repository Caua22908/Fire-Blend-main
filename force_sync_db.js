// ATENÇÃO: Este script vai APAGAR (DROP) todas as tabelas e recriá-las com os modelos atuais.
// Use somente se você concorda com perda de dados.
const { sequelize } = require('./models');

(async () => {
  try {
    console.log('⚠️  Iniciando force sync: isto vai apagar todas as tabelas e recriá-las (force: true).');
    await sequelize.sync({ force: true });
    console.log('✅ Todas as tabelas foram recriadas com sucesso (force: true).');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro durante force sync:');
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  }
})();
