const LocalStrategy = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('koa-passport');
const User = require('../models/user');


const init = (app) => {

  app.use(passport.initialize());

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !user.checkPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  ));

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(new Strategy(jwtOptions, (async (payload, done) => {
    try {
      if (payload) {
        return done(null, payload);
      }
      return done(null, false);
    } catch (e) {
      return done(e);
    }
  })));
};

module.exports = init;
