'use strict';
module.exports = (sequelize, DataTypes) => {
  var University = sequelize.define('University', {
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
          msg: 'University name must be present'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'University address must be present'
        }
      }
    }
  }, {});
  University.associate = function(models) {
    // associations can be defined here
    University.belongsTo(models.State, {
      foreignKey: 'stateId',
      onDelete: 'CASCADE'
    }),

    University.belongsToMany(models.Course, {
      through: 'UniversityCourses',
      as: 'courses',
      foriegnKey: 'universityId'
    }),

    University.hasMany(models.College, {
      foreignKey: 'universityId',
      as: 'colleges'
    })
  };
  return University;
};