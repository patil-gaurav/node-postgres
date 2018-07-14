'use strict';

var helper = require('../helpers/application');

module.exports = (sequelize, DataTypes) => {
  var University = sequelize.define('University', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'University name must be present'
        },
        isUnique: isUnique("University", "name")
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Address must be present'
        },
        isUnique: isUnique("University", "address")
      }
    }
  }, {});
  University.associate = function(models) {
    // associations can be defined here
    University.belongsTo(models.State, {
      foreignKey: 'stateId',
      CASCADE: true
    });

    University.belongsToMany(models.Course, {
      as: 'courses',
      through: 'UniversityCourse',
      foreignKey: 'universityId'
    });

    University.hasMany(models.College, {
      as: 'colleges',
      foreignKey: 'universityId'
    });

  };
  return University;
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