/**
 * Created by raf on 7/1/17.
 */
var _ = require("lodash");
var jwt = require('jsonwebtoken');
var userModel = new require(global.appRoot + "/models/user");
var bcrypt = require('bcrypt');

module.exports = {
  'create': function (req, res, done) {
    if (req.body.email && req.body.password) {
      userModel.create(req.body, function (err, user) {
        if (err) return done({msg: err});
        if (!user) {
          res.status(401).json({msg: "user was not created"});
        }

        var payload = {id: user.id};
        var token = jwt.sign(payload, global.config.secretKey, { expiresIn: '1h' });
        user.token = token;

        res.json({ message: "Account created", auth_token: token });
      });
    }
  }
};
