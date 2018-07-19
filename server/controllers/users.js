var express = require('express');

const User = require('../models').User;

module.exports = {
  signup (req, res) {
    res.render('users/signup', { csrfToken: req.csrfToken(), title: 'Register User' });
  },

  login (req, res) {
    res.render('users/login', { csrfToken: req.csrfToken() });
  },

  setlogin (req, res) {
    res.redirect('/');
  },

  profile (req, res) {
    res.render('users/profile', {profile: req.user});
  },

  logout (req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  }
  
};

