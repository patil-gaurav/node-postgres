const State = require('../../models').State;
const University = require('../../models').University;

module.exports = {
  create (req, res) {
    return State
      .create({
        name: req.body.name,
        country: req.body.country,
        capital: req.body.capital
      })
      .then(state => res.status(201).send(state))
      .catch(error => res.status(400).send(error));
  },

  index (req, res) {
    return State
            .findAll({
              include: [{
                model: University,
                as: 'universities'
              }]
            })
            .then(states => res.status(201).send(states))
            .catch(error => res.status(400).send(error));
  }
}