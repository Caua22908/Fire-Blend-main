module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Quantidade', {
    produto_id_produto: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, allowNull: false },
    estoque_id_estoque: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false }
  }, {
    tableName: 'quantidade',
    timestamps: false,
  });
};
