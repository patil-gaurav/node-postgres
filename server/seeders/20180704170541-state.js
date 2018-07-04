'use strict';

var data = require('../data/states');

var states = data.states;

var filterStates = function(states) {
  var filteredStates = [];

  for(var i = 0; i < states.length; i++) {
    filteredStates.push({
      // uuid: Math.random().toString(36).slice(3),
      name: states[i].name,
      country: states[i].country,
      capital: states[i].capital,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  console.log(filteredStates);
  return filteredStates;
};


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('States', filterStates(states), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('States', null, {});
  }
};

