'use strict';

var helper = require('../helpers/application');

module.exports = (sequelize, DataTypes) => {
  var State = sequelize.define('State', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'State must be present'
        },
        isUnique: helper.isUniqueValidation('State', 'name')
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Country Must be present'
        }
      }
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Capital must be present'
        }
      }
    }
  }, {});
  State.associate = function(models) {
    // associations can be defined here
    State.hasMany(models.University, {
      // foreignKey: 'stateId',
      as: 'universities',
      foreignKey: 'stateId',
    })
  };
  return State;
};
