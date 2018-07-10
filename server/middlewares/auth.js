const AccessToken = require('../models').AccessToken;
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config/secret');

const checkAuth = (req, res, next) => {
  var token = getToken(req.headers);
  if (token) {

    AccessToken.find({
      where: {
        token: token
      }
    })
    .then(accesToken => {
      if (!accesToken) {
        return res.json({success: false, message: 'Please login'});
      }

      jsonwebtoken.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.json({success: false, message: 'Invalid token'})
        }
        // res.json({success: true, message: decoded})
        req.user = {
          email: decoded.email
        }
        next();
      })
    })
  } else {
    res.json({success: false, message: 'Token not provided'});
  }
}

module.exports = {
  checkAuth
}

var getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length == 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}