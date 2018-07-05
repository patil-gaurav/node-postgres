'use strict';
module.exports = (sequelize, DataTypes) => {
  var State = sequelize.define('State', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'State must be present'
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Country must be present'
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
      foreignKey: 'stateId',
      as: 'universities'
    })
  };
  return State;
};