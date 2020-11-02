const mongoose = require('mongoose');
const SECRETKEY = require('./keys').SECRETKEY;
const User = mongoose.model('users');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRETKEY
}
module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.id }).then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }).catch(err => {
      return done(err, false);
    });
  }));
}