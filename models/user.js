"use strict";
var db = require(global.appRoot + '/abstract/connector');
var _ = require('lodash');
var moment = require('moment');
var async = require('async');
var bcrypt = require('bcrypt');

module.exports = {

  findOne: function (param, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      if (_.isEmpty(param)) return done({msg: "wrong parameters for search."});

      connection.select('users', '*', param, {id: 'ASC LIMIT 1'}, done); // hack for order and limit
      connection.release();
    });
  },

  create: function(param, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      var created = new Date();
      var query = 'INSERT INTO users SET ?';
      var user = {
        name: param.name,
        email: param.email,
        password_digest: bcrypt.hashSync(param.password, 10),
        created_at: created,
        updated_at: created
      };
      connection.query(query, user, function (err, result) {
        if (err) return done(err);

        user.id = result.insertId;
        done(null, user);
      });
      connection.release();
    });
  }

};
