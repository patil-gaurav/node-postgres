'use strict';
module.exports = (sequelize, DataTypes) => {
  var UniversityCourse = sequelize.define('UniversityCourse', {
    universityId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {});
  UniversityCourse.associate = function(models) {
    // associations can be defined here
    UniversityCourse.belongsTo(models.University, {
      foreignKey: 'universityId',
    });

    UniversityCourse.belongsTo(models.Course, {
      foreignKey: 'courseId',
    });

  };
  return UniversityCourse;
};