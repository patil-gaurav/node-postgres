'use strict';
module.exports = (sequelize, DataTypes) => {
  var EducationDetail = sequelize.define('EducationDetail', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    sscMarksTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sscMarksOutof: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sscPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sscPassingYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hscPhysics: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hscChemistry: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hscMathematics: {
      type: DataTypes.INTEGER,
    },
    hscBiology: {
      type: DataTypes.INTEGER,      
    },
    hscMarksTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hscMarksOutof: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hscPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    hscPassingYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cetPhysics: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cetChemistry: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cetMathematics: {
      type: DataTypes.INTEGER,
    },
    cetBiology: {
      type: DataTypes.INTEGER,
    },
    cetPCMMarksTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cetPCBMarksTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cetMarksOutof: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cetPassingYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
    }


  }, {});
  EducationDetail.associate = function(models) {
    // associations can be defined here
    EducationDetail.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return EducationDetail;
};