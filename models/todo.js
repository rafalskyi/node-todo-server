"use strict";
var db = require(global.appRoot + '/abstract/connector');
var _ = require('lodash');
var moment = require('moment');
var async = require('async');
var itemModel = require(global.appRoot + "/models/item");

var modelFields = ['id', 'title', 'updated_at'];

module.exports = {
  all: function(user, done) {
    db.main.getConnection(function(err, connection) {
      if (err) return done(err);
      if (!user && !user.id) return done({msg: "current user is not found."});

      connection.select('todos', modelFields.join(','), {created_by: user.id}, {id: 'ASC'},
        function(err, result) {
          if (err) return done(err);
          let itemCallbacks = {};

          for (let todo of result) {
            itemCallbacks[todo.id] = function(callback) {
              itemModel.all(todo, function(err, result) {
                callback(err, result);
              });
            }
          }

          async.parallel(itemCallbacks,
            function(err, items) {
              if (err) return done(err);
              for (let todo of result) {
                todo.items = items[todo.id];
              }

              // returl todoes with items
              done(null, result);
            });
        }); // hack for order and limit
      connection.release();
    });
  },

  create: function(user, param, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      var created = new Date();
      var query = 'INSERT INTO todos SET ?';
      var todo = {
        title: param.title,
        created_by: user.id,
        created_at: created,
        updated_at: created
      };
      connection.query(query, todo, function (err, result) {
        if (err) return done(err);

        todo.id = result.insertId;
        done(null, todo);
      });
      connection.release();
    });
  },

  update: function (fields, conditions, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      if(fields.id) delete(fields.id);

      var updated = new Date();
      fields = _.extend(fields, {updated_at: updated});

      connection.update('todos', fields, conditions, done);
      connection.release();
    });
  },

  delete: function(id, done) {
    db.main.getConnection(function (err, connection) {
      if (err) return done(err);
      if (_.isEmpty(id)) return done({msg: "wrong id for delete."});

      connection.beginTransaction(function(err) {
        if (err) { done(err); }

        itemModel.delete({todo_id: id}, function(err, result) {
          if (err) {
            return connection.rollback(function() {
              done(err);
            });
          }

          connection.delete('todos', {id: id}, function(err, affectedRows) {
            if (err) {
              return connection.rollback(function() {
                done(err);
              });
            }
            connection.commit(function(err) {
              if (err) {
                return connection.rollback(function() {
                  done(err);
                });
              }
              done(null, affectedRows);
            });
          });
        });
      });


      connection.release();
    });
  }
};
