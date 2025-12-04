// Arquivo de conexão MySQL usando Sequelize
// Use variáveis de ambiente para credenciais: DB_NAME_MY, DB_USER_MY, DB_PASS_MY, DB_HOST_MY, DB_PORT_MY
const { Sequelize } = require('sequelize');

// Defaults provided by user: user=root, pass=admin, port=3306, db=mydb
const DB_NAME = process.env.DB_NAME_MY || process.env.DB_NAME || 'mydb';
const DB_USER = process.env.DB_USER_MY || process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS_MY || process.env.DB_PASS || 'admin';
const DB_HOST = process.env.DB_HOST_MY || process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT_MY ? parseInt(process.env.DB_PORT_MY, 10) : (process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    // charset and other options can go here
  },
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

// Teste de conexão rápido
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão MySQL estabelecida com sucesso:', `${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
  } catch (err) {
    console.error('❌ Falha ao conectar ao MySQL:');
    console.error(err && err.stack ? err.stack : err);
    // Não sair para permitir que o arquivo seja importado em outras partes sem encerrar processo automaticamente
  }
})();

module.exports = { sequelize };
