var express = require('express');

const User = require('../models').User;

module.exports = {
  register (req, res) {
    res.render('users/register', { title: 'Regidsfdsfdsfster User' });
  },

  login (req, res) {
    res.render('users/login');
  },

  setlogin (req, res) {
    res.redirect('/');
  },

  profile (req, res) {
    res.render('users/profile');
  },

  logout (req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  }
  
};

