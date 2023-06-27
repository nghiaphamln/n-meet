const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');

const homeRouter = require('./routes/home.route');


dotenv.config();

// connect db
mongoose.connect(process.env.MONGO_DB);
mongoose.Promise = global.Promise;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
require('./configs/passport')(passport);

app.use('/', homeRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res) {
  res['locals']['message'] = err['message'];
  res['locals']['error'] = req.app.get('env') === 'development' ? err : {};
  res['status'](err['status'] || 500);
  res['render']('error');
});

module.exports = app;
