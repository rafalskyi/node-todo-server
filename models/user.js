"use strict";
var db = require(global.appRoot + '/abstract/connector');
var _ = require('lodash');
var moment = require('moment');
var async = require('async');

module.exports = {

  findOne: function (param, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      if (_.isEmpty(param)) return done({msg: "wrong parameters for search."});

      connection.select('users', '*', param, {id: 'ASC LIMIT 1'}, done); // hack for order and limit
      connection.release();
    });
  }

};
