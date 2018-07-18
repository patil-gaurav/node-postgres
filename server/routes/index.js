const userCtrl = require('../controllers').users;
const csrf = require('csurf');
const csrfProtection = csrf();
// const passport = require('passport');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersApiCtrl = require('../controllers').usersApi;
const authMiddlewares = require('../middlewares/auth');
const statesApiCtrl = require('../controllers').statesApi;
const universitiesApiCtrl = require('../controllers').universitiesApi;
const coursesApiCtrl = require('../controllers').coursesApi;
const collegesApiCtrl = require('../controllers').collegesApi;

module.exports = (app, passport) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);

  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);

  // User Routes
  app.post('/api/users/signup', usersApiCtrl.signup);
  app.post('/api/users/signin', usersApiCtrl.signin);
  app.get('/api/users/profile', authMiddlewares.checkAuth, usersApiCtrl.profile);

  // State Routes
  app.post('/api/states', statesApiCtrl.create);
  app.get('/api/states', authMiddlewares.checkAuth, statesApiCtrl.index);

  // University Routes
  app.post('/api/universities', universitiesApiCtrl.create);
  app.get('/api/universities', universitiesApiCtrl.index);
  app.post('/api/add-course-to-university', universitiesApiCtrl.addCourseToUniversity);

  // Course Routes
  app.post('/api/courses', coursesApiCtrl.create);
  app.get('/api/courses', coursesApiCtrl.index);

  // College Routes
  app.post('/api/colleges', collegesApiCtrl.create);
  app.get('/api/colleges', collegesApiCtrl.index);
  app.post('/api/add-course-to-college', collegesApiCtrl.addCourseToCollege);

  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method not allowed',
    })
  );

  // CSRF Protected Routes
  // app.use(csrfProtection);
  app.get('/user/profile',isLoggedIn, userCtrl.profile);
  app.get('/user/logout', userCtrl.logout);

  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Admission System' });
  });

  app.get('/user/register', userCtrl.register);
  app.get('/user/login', userCtrl.login);
  app.post('/user/login', passport.authenticate('local.signin', { successRedirect: '/user/profile',
  failureRedirect: '/user/login'}
  ));


  function isLoggedIn(req, res, next) {
    console.log('==========='+req.isAuthenticated())
      if (req.isAuthenticated()) {
          return next();
      }
  
      res.redirect('/user/login');
  }
}

// function isLoggedIn (req, res, next) {
//   console.log(req.session);
//   if (req.session.user && req.cookies.user_sid) {
//       return next();
//   }
//   res.redirect('/');
// }

// function isNotLoggedIn (req, res, next) {
//   if (!req.isAuthenticated()) {
//       return next();
//   }
//   res.redirect('/');
// }