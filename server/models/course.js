'use strict';
module.exports = (sequelize, DataTypes) => {
  var Course = sequelize.define('Course', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Course name must be present'
        }
      }
    },
    courseType: {
      type: DataTypes.ENUM,
      values: ['medical', 'pharmacy', 'engineering'],
      allowNull: false,
      defaultValue: 'engineering',
      validate: {
        notEmpty: {
          args: true,
          msg: 'Course type must be present'
        },
        isIn: {
          args: [['medical', 'pharmacy', 'engineering']],
          msg: 'Course type must be in medical, pharmacy or engineering'
        }
      }
    }
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
    Course.belongsToMany(models.University, {
      as: 'Course',
      through: 'UniversityCourses',
      foreignKey: 'courseId'
    }),

    Course.hasMany(models.College, {
      foreignKey: 'courseId',
      as: 'colleges'
    })
  };
  return Course;
};