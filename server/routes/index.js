const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const statesApiCtrl = require('../controllers').states;
const universitiesApiCtrl = require('../controllers').universities;
const coursesApiCtrl = require('../controllers').courses;

module.exports = (app) => {
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

  // State Routes
  app.post('/api/states', statesApiCtrl.create);
  app.get('/api/states', statesApiCtrl.index);

  // University Routes
  app.post('/api/states/:stateId/universities', universitiesApiCtrl.create);
  app.get('/api/universities', universitiesApiCtrl.index);

  // Course Routes
  app.post('/api/universities/:universityId/courses', coursesApiCtrl.create);

  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method not allowed',
    })
  );
}
