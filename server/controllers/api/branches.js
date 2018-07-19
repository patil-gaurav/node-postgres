const College = require('../../models').College;
const Course = require('../../models').Course;
const Branch = require('../../models').Branch;
const CONSTANTS = require('../../constant/constant');

module.exports = {
  addBranchToCollege(req, res) {
    if (!req.body.courseId || !req.body.collegeId ) {
      return res.send({message: 'College and Course id must be present'});
    }

    College.find({
      where: {
        id: req.body.collegeId
      }
    }).then(college => {
      if (!college) {
        return res.status(404).send({message: 'College not found'});
      }

      Course.find({
        where: {
          id: req.body.courseId
        }
      }).then(course => {
        if (!course) {
          return res.status(404).send({message: 'Course not found'});
        }

        var branchParams = {
          branchId: course.id,
          branchCode: generateBranchCode(college.code, course.name),
          branchName: course.name,
          status: req.body.status,
          totalIntake: req.body.totalIntake,
          collegeId: college.id
        }
        
        // res.send({request: req.body, college: college, course: course});
        Branch.create(branchParams)
              .then(branch => res.status(200).send({branch: branch, course: course, college: college}))
              .catch(error => res.send(error));

      }).catch(error => res.send(error));
    }).catch(error => res.send(error));
  }
}

var generateBranchCode = function (collegeCode, branchName) {
  var branchCode;
  switch (branchName) {
    case 'civil': {
      branchCode = collegeCode + CONSTANTS.CIVIL_ENGG;
      break;
    }
    case 'computer': {
      branchCode = collegeCode + CONSTANTS.COMPUTER_ENGG;
      break;
    }
    case 'mechanical': {
      branchCode = collegeCode + CONSTANTS.MECHANICAL_ENGG;
      break;
    }
  }
  return branchCode;
}