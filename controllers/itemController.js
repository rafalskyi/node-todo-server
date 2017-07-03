/**
 * Created by raf on 7/1/17.
 */
var _ = require("lodash");
var itemModel = require(global.appRoot + "/models/item");

module.exports = {
  'index': function(req, res, done) {
    itemModel.all(req.todo_id, function(err, result) {
      if (err) return done(err);

      res.json(result);
    });
  },

  'show': function(req, res, done) {
    itemModel.findOne({id: req.id}, function(err, result) {
      if (err) return done(err);

      res.json(result);
    });
  },

  'create': function(req, res, done) {
    itemModel.create(req.body, function(err, item) {
      if (err) return done({msg: err});
      if (!item) {
        res.status(401).json({msg: "item was not created"});
      }

      res.json(item);
    });
  },

  'update': function(req, res, done) {
    itemModel.update(req.body, {id:req.params.id}, function(err, result) {
      if (err) return done(err);

      res.json(result);
    });
  },

  'delete': function(req, res, done) {
    itemModel.delete({id: req.params.id}, function(err, result) {
      if (err) return done(err);

      res.json(result);
    });
  }
};
