const { sequelize } = require('../db_mysql');
const { DataTypes } = require('sequelize');

const Cliente = require('./cliente')(sequelize, DataTypes);
const Produto = require('./produto')(sequelize, DataTypes);
const Estoque = require('./estoque')(sequelize, DataTypes);
const Quantidade = require('./quantidade')(sequelize, DataTypes);
const Venda = require('./venda')(sequelize, DataTypes);

// Associações
// Produto <-> Estoque (N:N) via Quantidade
Produto.belongsToMany(Estoque, { through: Quantidade, foreignKey: 'produto_id_produto', otherKey: 'estoque_id_estoque' });
Estoque.belongsToMany(Produto, { through: Quantidade, foreignKey: 'estoque_id_estoque', otherKey: 'produto_id_produto' });

// Venda -> Cliente
Venda.belongsTo(Cliente, { foreignKey: 'cliente_id_cliente' });
Cliente.hasMany(Venda, { foreignKey: 'cliente_id_cliente' });

// Venda -> Produto
Venda.belongsTo(Produto, { foreignKey: 'produto_id_produto' });
Produto.hasMany(Venda, { foreignKey: 'produto_id_produto' });

module.exports = {
  sequelize,
  Cliente,
  Produto,
  Estoque,
  Quantidade,
  Venda,
};
