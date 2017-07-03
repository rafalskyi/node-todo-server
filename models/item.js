"use strict";
var db = require(global.appRoot + '/abstract/connector');
var _ = require('lodash');
var moment = require('moment');
var async = require('async');

var modelFields = ['id', 'name', 'todo_id', 'done', 'updated_at'];

module.exports = {

  all: function (todo, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      if (!todo && !todo.id) return done({msg: "no item owner."});

      connection.select('items', modelFields.join(','), {todo_id: todo.id}, {id: 'ASC'}, done); // hack for order and limit
      connection.release();
    });
  },

  findOne: function (param, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      if (_.isEmpty(param)) return done({msg: "wrong parameters for search."});

      connection.select('items', modelFields.join(','), param, {id: 'ASC LIMIT 1'}, done); // hack for order and limit
      connection.release();
    });
  },

  create: function(param, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      var created = new Date();
      var query = 'INSERT INTO items SET ?';
      var item = {
        name: param.name,
        done: 0,
        todo_id: param.todo_id,
        created_at: created,
        updated_at: created
      };
      connection.query(query, item, function (err, result) {
        if (err) return done(err);

        item.id = result.insertId;
        done(null, item);
      });
      connection.release();
    });
  },

  update: function (fields, conditions, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      if (!_.isEmpty(fields.done)) {
        fields.done = !!fields.done;
      }
      if(fields.id) delete(fields.id);

      var updated = new Date();
      fields = _.extend(fields, {updated_at: updated});


      connection.update('items', fields, conditions, done);
      connection.release();
    });
  },

  delete: function(conditions, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      if (_.isEmpty(conditions)) return done({msg: "wrong conditions for delete."});

      connection.delete('items', conditions, done); // hack for order and limit
      connection.release();
    });
  }

};
