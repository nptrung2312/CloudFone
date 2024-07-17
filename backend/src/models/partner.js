'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Partner.init({
    partnerId: DataTypes.INTEGER,
    businessId1: DataTypes.INTEGER,
    businessId2: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Partner',
  });
  return Partner;
};