module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Estoque', {
    id_estoque: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    quantidade_estoque: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'estoque',
    timestamps: false,
  });
};
