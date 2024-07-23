'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      partners.belongsTo(models.users, { foreignKey: 'businessId1' });
      partners.belongsTo(models.users, { foreignKey: 'businessId2' });
    }
  };
  partners.init({
    partnerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    businessId1: DataTypes.INTEGER,
    businessId2: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'partners',
  });
  return partners;
};