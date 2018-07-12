'use strict';
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
        isUnique: function (value, next) {
          State.find({
            where: {name: value},
            attributes: ['id']
          }).done(function(error, user) {
            if (error) {
              return next(error);
            }
            if (user) {
              // return res.status(401).json({msg: 'State is already exist'})
              return next('State is already exist');
            }
            next();
          })
        }
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
  };
  return State;
};
