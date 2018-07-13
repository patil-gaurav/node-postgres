'use strict';
module.exports = (sequelize, DataTypes) => {
  var CollegeCourse = sequelize.define('CollegeCourse', {
    collegeId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {});
  CollegeCourse.associate = function(models) {
    // associations can be defined here

    CollegeCourse.belongsTo(models.College, {
      foreignKey: 'collegeId'
    });

    CollegeCourse.belongsTo(models.Course, {
      foreignKey: 'courseId'
    });
  };
  return CollegeCourse;
};