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
        isUnique: isUnique('State', 'name')
        // isUnique(value, next) {
        //   State.find({
        //     where: { name: value },
        //     attributes: ['id']
        //   }).done((state) => {
        //     if (state)
        //       return next('name present');

        //     next();
        //   });
        // }

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
        },
        isUnique: isUnique('State', 'capital')
        // isUnique(value, next) {
        //   State.find({
        //     where: { capital: value },
        //     attributes: ['id']
        //   }).done((state) => {
        //     if (state)
        //       return next('capital present');

        //     next();
        //   });
        // }
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

// var isUnique = function(modelName, field) {
//   return function(value, next) {
//     var Model = require("../models")[modelName];
//     var query = {};
//     query[field] = value;
//     Model.find({where: query, attributes: ["id"]}).then(function(obj) {
//       if (obj) {
//         next(field + ' "' + value + '" is already in use');
//       } else {
//         next();
//       }
//     });
//   };
// }