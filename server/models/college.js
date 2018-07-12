'use strict';

var helper = require('../helpers/application');

module.exports = (sequelize, DataTypes) => {
  var College = sequelize.define('College', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'College code must be present'
        },
        len: {
          args: 4,
          msg: 'Enter 4 digit college code in string format'
        },
        isUnique: helper.isUniqueValidation("College", "code")
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'College name must be present'
        },
        isUnique: helper.isUniqueValidation("College", "name")
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'College address must be present'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'City must present'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'State must present'
        }
      }
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Pin must present'
        },
        len: {
          args: 6,
          msg: 'Enter 6 digit pin code in string format'
        }
      }
    }
  }, {});
  College.associate = function(models) {
    // associations can be defined here
  };
  return College;
};