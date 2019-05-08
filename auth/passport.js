const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('../helpers/config/config');

let config = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret.secretOrKey
}

passport.use('jwt', new JwtStrategy(config, function (jwt_payload, done) {
  const {username, id, type} = jwt_payload;
  const user = {username, id, type};
    return done(null, user);
}));

module.exports = passport;

