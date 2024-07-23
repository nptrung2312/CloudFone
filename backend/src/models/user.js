'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasOne(models.accounts, { foreignKey: 'email' });
      users.hasOne(models.partners, { foreignKey: 'userId' });
    }
  };
  users.init({
    email: {
      type: DataTypes.STRING(125),
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.STRING,
    sex: DataTypes.STRING,
    image: DataTypes.STRING,
    phone: DataTypes.STRING,
    type: DataTypes.STRING,
    cardId: DataTypes.STRING,
    companyId: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};