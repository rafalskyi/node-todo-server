/**
 * Created by raf on 7/1/17.
 */
var _ = require("lodash");
var todoModel = require(global.appRoot + "/models/todo");

module.exports = {
  'index': function (req, res, done) {
    todoModel.all(req.user, function(err, result) {
      if (err) return done(err);

      res.json(result);
    });
  },

  'create': function (req, res, done) {
    todoModel.create(req.user, req.body, function(err, result) {
      if (err) return done(err);

      res.json(result);
    });
  },

  'update': function (req, res, done) {
    todoModel.update({title: req.body.title}, {id:req.params.id}, function(err, result) {
      if (err) return done(err);

      res.json(result);
    });
  },

  'delete': function(req, res, done) {
    todoModel.delete(req.params.id, function(err, result) {
      if (err) return done(err);

      res.json(result);
    });
  }
};
