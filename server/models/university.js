'use strict';
module.exports = (sequelize, DataTypes) => {
  var University = sequelize.define('University', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  University.associate = function(models) {
    // associations can be defined here
    University.belongsTo(models.State, {
      foreignKey: 'stateId',
      onDelete: 'CASCADE'
    }),

    University.hasMany(models.Course, {
      foreignKey: 'universityId',
      as: 'courses'
    }),

    University.hasMany(models.College, {
      foreignKey: 'universityId',
      as: 'colleges'
    })
  };
  return University;
};