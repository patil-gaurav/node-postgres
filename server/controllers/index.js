const users = require('./users');

const todos = require('./todos');
const todoItems = require('./todoitems');
const usersApi = require('./api/users');
const statesApi = require('./api/states');
const universitiesApi = require('./api/universities');
const coursesApi = require('./api/courses');
const collegesApi = require('./api/colleges');

module.exports = {
    users,
    todos,
    todoItems,
    usersApi,
    statesApi,
    universitiesApi,
    coursesApi,
    collegesApi,
};