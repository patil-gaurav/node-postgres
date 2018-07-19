'use strict';
module.exports = (sequelize, DataTypes) => {
  var Branch = sequelize.define('Branch', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    branchId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    branchCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Branch code must be present'
        },
        isUnique: isUnique("Branch", "branchCode")
      }
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Branch name must be present'
        }
      }
    },
    status: {
      type: DataTypes.ENUM(['government', 'private']),
      allowNull: false,
      defaultValue: 'private'
    },
    totalIntake: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Branch.associate = function(models) {
    // associations can be defined here
    Branch.belongsTo(models.College, {
      foreignKey: 'collegeId'
    });
  };
  return Branch;
};

var isUnique = function(modelName, field) {
  return function(value, next) {
    var Model = require("../models")[modelName];
    var query = {};
    query[field] = value;
    Model.find({where: query, attributes: ["id"]}).then(function(obj) {
      if (obj) {
        next(field + ' "' + value + '" is already in use');
      } else {
        next();
      }
    });
  };
}