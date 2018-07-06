const User = require('../../models').User;
const config = require('../../config/secret');
const jsonwebtoken = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

module.exports = {
  signup(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.json({ success: false, message: 'Please provide email and password' });
    }

    // var user = User.build({
    //   email: email,
    //   password: password
    // });
    // user.save()
    User
    .create({
      email: email,
      password: password
    })
    .then(user => {
      res.status(201).send({
        success: true,
        message: 'User created successfully, Please Confirm your account before login.'
      })
    })
    .catch(error => res.status(401).send(error));
  },

  signin(req, res) {
    User.findOne({
      where: { email: req.body.email }
    })
    .then(user => {
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'User not found'
        })
      }
      
    })
  }
}

// var hashedPassword = function(password) {
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//       if(err) {
//         return err;
//       }
//       return hash;
//     });
//   });
// }