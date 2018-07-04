'use strict';
module.exports = (sequelize, DataTypes) => {
  var Course = sequelize.define('Course', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseType: {
      type: DataTypes.ENUM,
      values: ['medical', 'pharmacy', 'engineering'],
      allowNull: false,
      defaultValue: 'engineering'
    }
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
    Course.belongsTo(models.University, {
      foreignKey: 'universityId',
      onDelete: 'CASCADE'
    }),

    Course.hasMany(models.College, {
      foreignKey: 'courseId',
      as: 'colleges'
    })
  };
  return Course;
};