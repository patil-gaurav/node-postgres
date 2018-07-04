'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Branches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      branchChoiceCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      branchName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shift: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['first', 'second'],
        defaultValue: 'first'
      },
      branchIntake: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    return queryInterface.dropTable('Branches');
  }
};