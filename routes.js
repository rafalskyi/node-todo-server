var express = require('express');
var router = express.Router();
var controllers = [];

module.exports = function(passport) {
  router.post("/auth/login", function(req, res, next) {
    require('./controllers/authenticationController').authenticate(req, res, next);
  });

  router.post("/signup", function(req, res, next) {
    require('./controllers/userController').create(req, res, next);
  });

//todos
  router.get("/todos", passport.authenticate('jwt', {session: false}), function(req, res, next) {
    require('./controllers/todoController').index(req, res, next);
  });
  router.post("/todos", passport.authenticate('jwt', {session: false}), function(req, res, next) {
    require('./controllers/todoController').create(req, res, next);
  });
  router.delete("/todos/:id", passport.authenticate('jwt', {session: false}), function(req, res, next) {
    require('./controllers/todoController').delete(req, res, next);
  });

//items
  router.post("/todos/:id/items", passport.authenticate('jwt', {session: false}), function(req, res, next) {
    require('./controllers/itemController').create(req, res, next);
  });
  router.patch("/todos/:todo_id/items/:id", passport.authenticate('jwt', {session: false}), function(req, res, next) {
    require('./controllers/itemController').update(req, res, next);
  });
  router.delete("/todos/:todo_id/items/:id", passport.authenticate('jwt', {session: false}), function(req, res, next) {
    require('./controllers/itemController').delete(req, res, next);
  });

  return router;
};
