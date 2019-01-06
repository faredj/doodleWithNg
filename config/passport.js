const config = require('./config'),
    Strategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('../models/User');
const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function (passport) {
    passport.use(new Strategy(params, function (jwt_payload, done) {
        User.findById(jwt_payload.user._id, (err, user) => {
            if (err)
                return done(err);
            if (user)
                return done(null, user);
        });
    }));
};