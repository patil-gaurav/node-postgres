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
        allowNull: false,
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'University',
        //   key: 'id',
        //   as: 'universityId',
        // }
      },
      courseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // reference: {
        //   model: 'Course',
        //   key: 'id',
        //   as: 'courseId'
        // }
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