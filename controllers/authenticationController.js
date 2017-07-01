/**
 * Created by raf on 7/1/17.
 */
var _ = require("lodash");
var jwt = require('jsonwebtoken');

module.exports = {
  'authenticate': function (req, res, done) {
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
    }
    // usually this would be a database call:
    var users = require('./../config/tmpData').users;
    var user = users[_.findIndex(users, {email: email})];
    if (!user) {
      res.status(401).json({message: "no such user found"});
    }

    if (user.password === req.body.password) {
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      var payload = {id: user.id};
      var token = jwt.sign(payload, config.secretKey);
      user.token = token;
      res.json(user);
    } else {
      res.status(401).json({message: "passwords did not match"});
    }
  }
};
