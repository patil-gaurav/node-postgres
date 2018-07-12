const State = require('../../models').State;
const University = require('../../models').University;

module.exports = {
  create (req, res) {
    State.create({
      name: req.body.name.toLowerCase().trim(),
      country: req.body.country,
      capital: req.body.capital
    }).then(state => {
      return res.status(201).send(state);
    }).catch(error => res.status(401).send(error));
  },

  index (req, res) {
    State
      .findAll({
        include: [{
          model: University,
          as: 'universities'
        }],
      })
      .then(states => res.status(201).send(states))
      .catch(error => res.status(401).send(error));
  }
}
