// var passport = require('passport');
// const session = require('express-session');
const User = require('../models').User;
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

module.exports = (passport) => {
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(user => {
    done(err, user);
  }).catch(error => {
    return done(null, false, {msg: error});
  });
});

// passport.use('local.signup', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// }, function(req, email, password, done) {
//   User.find({
//     where: {
//       email: email
//     }
//   }, function(err, user) {
//     if (err) {
//       return done(err);
//     }
//     if (user) {
//       return done(null, false, {msg: 'Email is already in use'})
//     }


//   })
// }));

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  // console.log(req.body)
  // User.findOne({
  //   where: { email: req.body.email }
  // })
  // .then(user => {
  //   console.log("===User===========1======="+ user)
  //   if (!user) {
  //     console.log("==Not User ")
  //     return done(null, false, {msg: 'User not found'});
  //   }
  //   console.log("===User============2======")
  //   var isMatch = bcrypt.compareSync(req.body.password, user.password);
  //   console.log("===User=============3=====")
  //   if (!isMatch) {
  //     console.log("==Not Match ")
  //     return done(null, false, {msg: 'Wrong password'});
  //   }
  //   console.log("===User=================="+user.get())
  //   return done(null, user);
  // })
  // .catch(error => {
  //   console.log("===Error=================="+error);
  //   return done(null, false, {msg: 'Something went wrong'});
  // });
  var isValidPassword = function(userpass,password){
    return bcrypt.compareSync(password, userpass);
  }

  User.findOne({ where : { email: email}}).then(function (user) {

    if (!user) {
      return done(null, false, { message: 'Email does not exist' });
    }

    if (!isValidPassword(user.password,password)) {

      return done(null, false, { message: 'Incorrect password.' });

    }

    var userinfo = user.get();

    return done(null,userinfo);

  }).catch(function(err){

    console.log("Error:",err);

    return done(null, false, { message: 'Something went wrong with your Signin' });


  });

}));
}