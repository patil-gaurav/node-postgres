'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CollegeCourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      collegeId: {
        type: Sequelize.UUID,
        allowNull: false,
        reference: {
          model: 'Colleges',
          key: 'id',
          as: 'collegeId'
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
    return queryInterface.dropTable('CollegeCourses');
  }
};