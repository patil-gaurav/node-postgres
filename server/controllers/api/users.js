const User = require('../../models').User;
const config = require('../../config/secret');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  signup(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.json({ success: false, message: 'Please provide email and password' });
    }

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
      
      var isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (isMatch) {
        var token = jsonwebtoken.sign({email: user.email}, config.secret, {});
        res.json({success: true, token: 'JWT ' + token});
      } else {
        res.json({success: false, message: 'Password not match'});
      }
    });
  },

  profile(req, res) {
    // var token = getToken(req.headers);
    // if (token) {
    //   jsonwebtoken.verify(token, config.secret, function(err, decoded) {
    //     if (err) {
    //       return res.json({success: false, message: 'Invalid token'})
    //     }
    //     res.json({success: true, message: decoded})
    //   })
    // } else {
    //   res.json({success: false, message: 'Token not provided'});
    // }
    User.findOne({
      email: req.user.email
    })
    .then(user => {
      res.json({success: true, user: user});
    })
    
  }
}

// var getToken = function(headers) {
//   if (headers && headers.authorization) {
//     var parted = headers.authorization.split(' ');
//     if (parted.length == 2) {
//       return parted[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// }