'use strict';
module.exports = (sequelize, DataTypes) => {
  var AccessToken = sequelize.define('AccessToken', {}, {});
  AccessToken.associate = function(models) {
    // associations can be defined here
    AccessToken.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return AccessToken;
};