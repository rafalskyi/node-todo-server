'use strict';

var mysql = require('mysql'),
  mysqlUtils = require('mysql-utilities'),
  async = require('async'),
  config = require('../config');
var pool = {
  'main': null
};


module.exports = function (dbName) {
  var currentDb = 'main';
  var connect = function (done) {
    pool[currentDb] = mysql.createPool(config.db[currentDb]);
    pool[currentDb].on('connection', function(connection) {
      mysqlUtils.upgrade(connection);
      mysqlUtils.introspection(connection);
    });
    done();
  };

  var getPool = function () {
    return pool[currentDb];
  };

  var fixtures = function (data, done) {
    var pool = getPool();
    var names = Object.keys(data.tables);
    async.each(names, function (name, cb) {
      async.each(data.tables[name], function (row, cb) {
        var keys = Object.keys(row),
          values = keys.map(function (key) {
            return "'" + row[key] + "'";
          });
        var query = 'INSERT INTO `' + name + '` (`' + keys.join('`,`') + '`) VALUES (' + values.join(',') + ')';
        pool.getConnection(function(err, connection){
          connection.query(query, cb);
          connection.release();
        });
      }, cb);
    }, done);
  };

  var drop = function (tables, done) {
    var pool = getPool();
    async.each(tables, function (name, cb) {
      var query = 'DELETE FROM ' + name;
      pool.getConnection(function(err, connection){
        connection.query( query, cb);
        connection.release();
      });
    }, done);
  };

  currentDb = dbName || currentDb;
  return {
    currentDb: currentDb,
    connect: connect,
    getPool: getPool,
    fixtures: fixtures,
    drop: drop
  };
};
