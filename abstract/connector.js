"use strict";
var mainDb = require('./db')('main');

mainDb.connect(function (err) {
  if (err) {
    console.log('Unable to connect to billing MySQL.');
    process.exit(1);
  }
});

module.exports.main = mainDb.getPool();


