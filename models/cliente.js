module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Cliente', {
    id_cliente: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(45), allowNull: false },
    telefone: { type: DataTypes.STRING(45), allowNull: false },
    endereco: { type: DataTypes.STRING(100), allowNull: false },
    cpf: { type: DataTypes.STRING(15), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    senha: { type: DataTypes.STRING(45), allowNull: false }
  }, {
    tableName: 'cliente',
    timestamps: false,
  });
};
