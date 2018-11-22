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
        isUnique: isUnique("College", "code")
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
        isUnique: isUnique("College", "name")
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
  }, {
    hooks: {
      beforeSave: (college, options) => {
        console.log(college.code);
        college.code = college.code.replace(/\s/g,'');
      }
    }
  });
  College.associate = function(models) {
    // associations can be defined here
    College.belongsTo(models.University, {
      foreignKey: 'universityId'
    });

    College.belongsToMany(models.Course, {
      as: 'courses',
      through: 'CollegeCourse',
      foreignKey: 'collegeId'
    });

    College.hasMany(models.Branch, {
      as: 'branches',
      foreignKey: 'collegeId'
    })
  };
  return College;
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