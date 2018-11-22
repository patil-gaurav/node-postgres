const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const logger = require('morgan');
const path = require('path');
const csrf = require('csurf');
// const cookieParser = require('cookie-parser');

// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console
app.use(logger('dev'));




// Parse incomming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.set('views', path.join(__dirname, 'server/views'));
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: 'server/views/layouts',
    partialsDir: 'server/views/partials'
}));
app.set('view engine', '.hbs');
require('./server/config/passport')(passport);


app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.sessions = req.session;
    next();
});

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Setup the default catch-all route that sends back a velcome message in JSON format
require('./server/routes')(app, passport);
// app.get('*', (req, res) => res.status(200).send({
//     message: 'Welcome to the beginning of nothingness.',
// }));

// Export app module
module.exports = app;