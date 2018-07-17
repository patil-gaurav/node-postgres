var passport = require('passport');
var User = require('../models').User;
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.find({
    where: {
      email: email
    }
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, {msg: 'Email is already in use'})
    }


  })
}));

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.find({
    where: {
      email: email
    }
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {msg: 'User not found'})
    }

    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return done(null, false, {msg: 'Wrong password'});
    }

    done(null, user);


  })
}));