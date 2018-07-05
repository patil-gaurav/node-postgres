const Course = require('../../models').Course;
const University = require('../../models').University;

module.exports = {
  create (req, res) {
    University
      .findById(req.params.universityId)
      .then(university => {
        if (!university) {
          return res.status(401).send({
            message: 'University not found'
          })
        }

        Course
          .create({
            universityId: university.id,
            courseName: req.body.courseName,
            courseType: req.body.courseType
          })
          .then(course => res.status(201).send(course))
          .catch(error => res.status(401).send(error));
      })
      .catch(error => res.status(401).send(error));
  },
}