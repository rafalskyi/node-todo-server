/**
 * Created by raf on 7/1/17.
 */
var _ = require("lodash");
var jwt = require('jsonwebtoken');
var userModel = new require(global.appRoot + "/models/user");
var bcrypt = require('bcrypt');

module.exports = {
  'authenticate': function (req, res, done) {
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;

      userModel.findOne({email: email}, function (err, row) {
        if (err) return done({msg: err});
        var user = row[0];
        if (!user) {
          res.status(401).json({msg: "no such user found"});
        }

        if (!bcrypt.compareSync(password, user.password_digest))
          return done({msg:'incorrect password', status: 401}, false);

        var payload = {id: user.id};
        var token = jwt.sign(payload, global.config.secretKey);
        user.token = token;
        res.json(user);

      });
    }
  }
};
