const State = require('../../models').State;
const University = require('../../models').University;
const Course = require('../../models').Course;
const UniversityCourses = require('../../models').UniversityCourses;

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
  },

  index(req, res) {
    return University
            .findAll({
              include: [{
                model: Course,
                as: 'courses'
              }]
            })
            .then(universities => res.status(200).send(universities))
            .catch(error => res.status(401).send(error));
  },

  addCourseToUniversity(req, res) {
    // Find University
    University.findById(req.body.universityId).then(university => {
      if (!university) {
        return res.status(401).send({
          msg: 'University not available'
        });
      }
      // Find Course
      Course.findById(req.body.courseId).then(course => {
        if (!course) {
          return res.status(401).send({
            msg: 'Course not available'
          });
        }        
        // Create University Course
        console.log(req.body);
        UniversityCourses.create({
          universityId: req.body.universityId,
          courseId: req.body.courseId
        })
        .then(unicourse => res.status(201).send(unicourse))
        .catch(error => res.status(401).send(error));
        // University course end
      })
      .catch(coureseError => res.status(401).send(coureseError));
      // Course end
    })
    .catch(uniError => res.status(401).send(uniError));
    // University Course end
  }
  
}

University.hook('beforeCreate', 'setState', (state, options) => {
  console.log('hook called');
})