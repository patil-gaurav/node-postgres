'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UniversityCourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      universityId: {
        type: Sequelize.UUID,
        allowNull: false,
        reference: {
          model: 'Universities',
          key: 'id',
          as: 'universityId'
        }
      },
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        reference: {
          model: 'Courses',
          key: 'id',
          as: 'courseId'
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
    return queryInterface.dropTable('UniversityCourses');
  }
};