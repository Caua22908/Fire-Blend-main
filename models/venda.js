module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Venda', {
    id_venda: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cliente_id_cliente: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    produto_id_produto: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    forma_pagamento: { type: DataTypes.STRING(45), allowNull: false }
  }, {
    tableName: 'venda',
    timestamps: false,
  });
};
