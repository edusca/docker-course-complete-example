var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passportConfig = require('./auth/passport');
const db = require('./models/index');

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection to ecommerce db successful');
    })
    .catch((error) => {
        console.error('Unable to connect to the DB: ', error);
    });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./config/session')());

passportConfig.init();
app.use(passportConfig.passport.initialize());
app.use(passportConfig.passport.session());

var indexRouter = require('./routes/index')(passportConfig.passport);
var productsRouter = require('./routes/products')(passportConfig.passport);
var searchRouter = require('./routes/search')(passportConfig.passport);
var usersRouter = require('./routes/users')(passportConfig.passport);

app.use(require('./config/globals'));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/search', searchRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(require('./config/error'));

module.exports = app;
