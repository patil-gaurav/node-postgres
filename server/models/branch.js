'use strict';
module.exports = (sequelize, DataTypes) => {
  var Branch = sequelize.define('Branch', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    branchChoiceCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shift: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['first', 'second'],
      defaultValue: 'first'
    },
    branchIntake: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Branch.associate = function(models) {
    // associations can be defined here
    Branch.belongsTo(models.College, {
      foreignKey: 'collegeId',
      onDelete: 'CASCADE'
    })
  };
  return Branch;
};