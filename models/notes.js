'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    static associate(models) {
      Notes.belongsTo(models.User);
    }
  }
  Notes.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Notes',
    }
  );
  return Notes;
};
