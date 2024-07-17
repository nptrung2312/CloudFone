'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accounts.belongsTo(models.users, { foreignKey: 'email' });
    }
  };
  accounts.init({
    accountId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(125),
      unique: true,
      allowNull: false,
    },
    password: DataTypes.STRING,
    policy: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'accounts',
  });
  return accounts;
};