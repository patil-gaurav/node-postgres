'use strict';
module.exports = (sequelize, DataTypes) => {
  var College = sequelize.define('College', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    collegeCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalIntake: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  College.associate = function(models) {
    // associations can be defined here
    College.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    }),

    College.belongsTo(models.University, {
      foreignKey: 'universityId',
      onDelete: 'CASCADE'
    }),

    College.hasMany(models.Branch, {
      foreignKey: 'collegeId',
      as: 'branches'
    })
  };
  return College;
};