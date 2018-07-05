const State = require('../../models').State;
const University = require('../../models').University;

module.exports = {
  create(req, res) {
    State
      .findById(req.params.stateId)
      .then(state => {
        if (!state) {
          return res.status(401).send({
            message: 'State not found'
          });
        }
        University
          .create({
            stateId: state.id,
            name: req.body.name,
            address: req.body.address
          })
          .then(university => res.status(201).send(university))
          .catch(error => res.status(401).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}

University.hook('beforeCreate', 'setState', (state, options) => {
  console.log('hook called');
})