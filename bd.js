// Importa Sequelize e DataTypes para manipular o banco de dados
const { Sequelize, DataTypes } = require('sequelize');

// Variáveis de Conexão - ATENÇÃO: Substitua pelos seus dados reais!
const DB_NAME = 'Seu_Banco_SQL'; // Nome do banco de dados no SQL Server
const DB_USER = 'seu_usuario_sql'; // Ex: 'sa' ou seu login
const DB_PASS = 'sua_senha_sql'; // Sua senha
const DB_HOST = 'localhost'; // Nome da instância ou IP. Ex: 'localhost\\SQLEXPRESS'
const DB_DIALECT = 'mssql'; // O dialeto para SQL Server

// Configura a conexão com o SQL Server
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST, 
    dialect: DB_DIALECT, // Alterado de 'postgres' para 'mssql'
    logging: false, // desativa logs SQL no console
    // Opções específicas do SQL Server:
    dialectOptions: {
        // Se o seu servidor SQL for local e usar o driver 'tedious', 
        // você pode precisar de 'trustServerCertificate: true' ou 'encrypt: true'.
        // Exemplo para servidores que exigem criptografia:
        // encrypt: true, 
        // trustServerCertificate: true,
    },
});

// Define um modelo de tabela de exemplo
const Exemplo = sequelize.define('Exemplo', {
    // A definição para ID autoincrement é a mesma
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, 
    nome: { type: DataTypes.STRING(100), allowNull: false }, 
    descricao: { type: DataTypes.TEXT, allowNull: true }, 
}, {
    tableName: 'Tb_Exemplo', // nome da tabela no banco
    timestamps: false, // não cria campos createdAt/updatedAt
    freezeTableName: true, // Boa prática para MSSQL: impede a pluralização
});

// Testa a conexão com o banco
sequelize.authenticate()
    .then(() => console.log('✅ Conexão com o SQL Server estabelecida!'))
    // Ajustado para mostrar a mensagem de erro específica do SQL Server
    .catch(err => console.error('❌ Erro ao conectar ao SQL Server:', err.message));

// Exporta o modelo e a conexão
module.exports = { Exemplo, sequelize };