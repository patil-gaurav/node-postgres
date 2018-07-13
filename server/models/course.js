'use strict';

var helper = require('../helpers/application');

module.exports = (sequelize, DataTypes) => {
  var Course = sequelize.define('Course', {
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
          msg: 'Course name must be present'
        },
        isUnique: helper.isUniqueValidation("Course", "name")
      }
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['medical', 'pharmacy', 'engineering'],
      validate: {
        notEmpty: {
          args: true,
          msg: 'Course type must be present'
        },
        isIn: {
          args: [['medical', 'pharmacy', 'engineering']],
          msg: "Must be medical, pharmacy or engineering"
        }
      }
    },
    degree: {
      type: DataTypes.ENUM,
      values: ['under_graduate', 'post_graduate'],
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Degree must be present'
        },
        isIn: {
          args: [['under_graduate', 'post_graduate']],
          msg: 'Must be Under Graduate, Post Graduate'
        }
      }
    }
  }, {});
  Course.associate = function(models) {
    // associations can be defined here

    Course.belongsToMany(models.University, {
      as: 'universities',
      through: 'UniversityCourse',
      foreignKey: 'courseId'
    });

    Course.belongsToMany(models.College, {
      as: 'colleges',
      through: 'CollegeCourse',
      foreignKey: 'courseId'
    })
  };
  return Course;
};