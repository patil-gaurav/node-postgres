'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EducationDetails', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        reference: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      sscMarksTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sscMarksOutof: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sscPercentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      sscPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hscPhysics: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hscChemistry: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hscMathematics: {
        type: Sequelize.INTEGER,
      },
      hscBiology: {
        type: Sequelize.INTEGER,      
      },
      hscMarksTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hscMarksOutof: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hscPercentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      hscPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cetPhysics: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cetChemistry: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cetMathematics: {
        type: Sequelize.INTEGER,
      },
      cetBiology: {
        type: Sequelize.INTEGER,
      },
      cetPCMMarksTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cetPCBMarksTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cetMarksOutof: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cetPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rank: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EducationDetails');
  }
};