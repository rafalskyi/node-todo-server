var passport = require("passport");
var passportJWT = require("passport-jwt");
var userModel = new require(global.appRoot + "/models/user");
var _ = require("lodash");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
jwtOptions.secretOrKey = global.config.secretKey;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  userModel.findOne({id: jwt_payload.id}, function (err, row) {
    if (err) return done({msg: err});
    var user = row[0];
    if (!user) res.status(401).json({msg: "no such user found"});

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

module.exports = passport;
