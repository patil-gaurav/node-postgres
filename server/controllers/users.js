const User = require('../models').User;

module.exports = {
  register (req, res) {
    res.render('users/register', { title: 'Regidsfdsfdsfster User' });
  },

  getlogin (req, res) {
    res.render('users/login', { csrfToken: req.csrfToken(), title: 'Regidsfdsfdsfster User' });
  },

  setlogin (req, res) {
    res.redirect('/');
  }

  
};