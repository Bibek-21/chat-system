'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messageinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  messageinfo.init({
    userId: DataTypes.STRING,
    roomId: DataTypes.STRING,
    mesageBody: DataTypes.STRING,
    isdelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'messageinfo',
  });
  return messageinfo;
};