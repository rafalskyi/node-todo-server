/**
 * Created by raf on 7/1/17.
 */
var config = require('./config');
var path = require('path');

global.appRoot = path.resolve(__dirname);
global.config = config;

var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");

var passport = require('./passport_init');
var app = express();

app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// routes start
app.use('/', require('./routes')(passport));
// routes end

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next({msg: 'Not Found', status: 404});
});

//error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 422);
  if (err.status === 401) req.logout();

  var errMsg = err.msg || (err ? err.toString() : 'something went wrong');
  console.log('error ---->', err, req.originalUrl);
  res.send({error: errMsg});
});

app.listen(process.env.PORT || config.port, function() {
  console.log("Express is running: http://localhost:" + (process.env.PORT || config.port));
});
