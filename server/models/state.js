'use strict';
module.exports = (sequelize, DataTypes) => {
  var State = sequelize.define('State', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  State.associate = function(models) {
    // associations can be defined here
    State.hasMany(models.University, {
      foreignKey: 'stateId',
      as: 'universities'
    })
  };
  return State;
};