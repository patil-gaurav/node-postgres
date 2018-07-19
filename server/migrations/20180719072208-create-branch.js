'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Branches', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      branchId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      branchCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      branchName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(['government', 'private']),
        allowNull: false,
        defaultValue: 'private'
      },
      totalIntake: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      collegeId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCAD',
        reference: {
          model: 'Colleges',
          key: 'id',
          as: 'collegeId'
        }
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