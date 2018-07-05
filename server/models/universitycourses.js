'use strict';
module.exports = (sequelize, DataTypes) => {
  var UniversityCourses = sequelize.define('UniversityCourses', {}, {});
  UniversityCourses.associate = function(models) {
    // associations can be defined here
  };
  return UniversityCourses;
};