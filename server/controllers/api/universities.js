const State = require('../../models').State;
const University = require('../../models').University;
const Course = require('../../models').Course;

module.exports = {
  create (req, res) {
    if (!req.body.stateId) {
      return res.status(201).send({msg: 'State id must be present'});
    }

    State
      .find({
        where: {
          id: req.body.stateId
        }
      })
      .then(state => {
        if (!state) {
          return res.status(404).send({
            mes: 'State not found. Please enter valid state'
          })
        }

        University
          .create({
            stateId: state.id,
            name: req.body.name.toLowerCase().trim(),
            address: req.body.address
          })
          .then(university => res.status(201).send(university))
          .catch(error => res.status(401).send(error));
      })
      .catch(error => res.status(401).send(error));
  },

  index (req, res) {
    University
      .findAll({
        include: [{
          model: Course,
          as: 'courses'
        }]
      })
      .then(universities => res.status(201).send(universities))
      .catch(error => res.status(401).send(error));
  },

  addCourseToUniversity (req, res) {
    if (!req.body.universityId || !req.body.courseId) {
      return res.status(401).send({
        msg: 'UniversityId and CourseId must be present'
      });
    }

    University.find({
      where: {
        id: req.body.universityId
      }
    })
    .then(university => {
      if (!university) {
        return res.status(401).send({
          msg: 'University not found'
        });
      }
      // get courses from university
      // university.getCourses().then(c => res.send(c)).catch(e=>res.send(e));

      Course.find({
        where: {
          id: req.body.courseId
        }
      })
      .then(course => {
        if (!course) {
          return res.status(401).send({
            msg: 'Course not found'
          });
        }
        // Get universities from course
        // course.getUniversities().then(c => res.send(c)).catch(e=>res.send(e));

        university
          .addCourse([course])
          .then(uc => res.status(201).send(uc))
          .catch(error => res.status(401).send(error));
      })
      .catch(error => res.status(401).send(error));
    })
    .catch(error => res.status(401).send(error));
  }
}