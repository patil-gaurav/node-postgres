const College = require('../../models').College;
const University = require('../../models').University;
const Course = require('../../models').Course;
const Branch = require('../../models').Branch;

module.exports = {
  create (req, res) {
    if (!req.body.universityId || !req.body.code || !req.body.name ||
        !req.body.address || !req.body.city || !req.body.state || !req.body.pin) {
      return res.status(401).send({msg: 'Please provide all the fields'});
    }

    University.find({
      where: {
        id: req.body.universityId
      }
    })
    .then(university => {
      if (!university) {
        return res.status(404).send({msg: 'University not found'});
      }
      
      // university.setColleges([{
      //   code: req.body.code,
      //   name: req.body.name,
      //   address: req.body.address,
      //   city: req.body.city,
      //   state: req.body.state,
      //   pin: req.body.pin
      // }])
      // .then(college => res.status(201).send(college))
      // .catch(error => res.status(401).send(error));

      College
        .create({
          code: req.body.code,
          name: req.body.name,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          pin: req.body.pin,
          universityId: university.id
        })
        .then(college => {
          res.status(201).send(college);
        })
        .catch(error => res.status(401).send(error));
    })
    .catch(error => res.status(401).send(error));
  },

  index (req, res) {
    College
      .findAll({
        include: [{
          model: Course,
          attributes: ['id', 'name', 'type', 'degree'],
          as: 'courses'
        },
        {
          model: Branch,
          as: 'branches'
        }]}
      )
      .then(colleges => res.status(201).send(colleges))
      .catch(error => res.status(401).send(error));
  },

  addCourseToCollege (req, res) {
    if (!req.body.collegeId || !req.body.courseId) {
      return res.status(401).send({msg: 'All parameteres are mandatory.'});
    }

    College
      .find({
        where: {
          id: req.body.collegeId
        }
      })
      .then(college => {
        if (!college) {
          return res.status(401).send({msg: 'College not found'});
        }

        Course
          .find({
            where: {
              id: req.body.courseId
            }
          })
          .then(course => {
            if(!course) {
              return res.status(401).send({msg: 'Course not found'});
            }

            college
              .addCourse([course])
              .then(uc => res.status(201).send(uc))
              .catch(error => res.status(401).send(error));
          })
          .catch(error => res.status(401).send(error));
      })
      .catch(error => res.status(401).send(error));
  }
}