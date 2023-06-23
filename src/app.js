const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const session = require('express-session');

const homeRouter = require('./routes/home.route');


dotenv.config();

// connect db
mongoose.connect(process.env.mongodb);
mongoose.Promise = global.Promise;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
}));

app.use('/', homeRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res['locals']['message'] = err['message'];
  res['locals']['error'] = req.app.get('env') === 'development' ? err : {};
  res['status'](err['status'] || 500);
  res['render']('error');
});

module.exports = app;
