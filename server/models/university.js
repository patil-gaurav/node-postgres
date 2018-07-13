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
        isUnique: helper.isUniqueValidation("University", "name")
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
        isUnique: helper.isUniqueValidation("University", "address")
      }
    }
  }, {
    // validate: {
    //   uniqueName: helper.isUniqueValidation("University", "name"),
    //   uniqueAddress: helper.isUniqueValidation("University", "address")
    // }
  });
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
