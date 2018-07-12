const Course = require('../../models').Course;

module.exports = {
  create(req, res) {
    if (!req.body.name || !req.body.type || !req.body.degree) {
      return res.status(401).send({
        mes: 'All parameter must be present'
      })
    }

    Course
      .create({
        name: req.body.name.toLowerCase().trim(),
        type: req.body.type,
        degree: req.body.degree
      })
      .then(course => res.status(201).send(course))
      .catch(error => res.status(401).send(error));
  },

  index(req, res) {
    Course
      .findAll()
      .then(courses => res.status(201).send(courses))
      .catch(error => res.status(401).send(error));
  }
}