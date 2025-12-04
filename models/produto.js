module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Produto', {
    id_produto: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(45), allowNull: false },
    preco: { type: DataTypes.FLOAT, allowNull: false },
    colecao: { type: DataTypes.STRING(45), allowNull: false }
  }, {
    tableName: 'produto',
    timestamps: false,
  });
};
