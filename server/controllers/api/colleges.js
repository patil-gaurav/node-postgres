const College = require('../../models').College;
const University = require('../../models').University;

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
  }
}