var express = require('express');
var router = express.Router();
var controllers = [];

module.exports = function(passport) {
  router.post("/auth/login", function(req, res, next) {
    require('./controllers/authenticationController').authenticate(req, res, next);
  });

  router.get("/todos", passport.authenticate('jwt', {session: false}), function(req, res) {
    res.json({message: "Success! You can not see this without a token"});
  });

  return router;
};
