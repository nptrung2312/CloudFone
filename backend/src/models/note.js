'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notes.belongsTo(models.users, { foreignKey: 'userId' });
    }
  };
  notes.init({
    noteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    noteName: DataTypes.STRING,
    noteDate: DataTypes.STRING,
    noteDetail: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'notes',
  });
  return notes;
};