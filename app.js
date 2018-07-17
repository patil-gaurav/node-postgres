const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const csrf = require('csurf');
const session = require('express-session');
const passport = require('passport');

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));
require('./server/config/passport');

app.set('views', path.join(__dirname, 'server/views'));
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: 'server/views/layouts',
    partialsDir: 'server/views/partials'
}));
app.set('view engine', '.hbs');

// Parse incomming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

// Setup the default catch-all route that sends back a velcome message in JSON format
require('./server/routes')(app);
// app.get('*', (req, res) => res.status(200).send({
//     message: 'Welcome to the beginning of nothingness.',
// }));

// Export app module
module.exports = app;