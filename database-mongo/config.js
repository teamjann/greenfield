const passport = require('passport');
const LocalStrategy = require('passprot-local').Strategy;
const bodyParser = require('body-parser');
const db = require('./index');

module.exports = function (passprot) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  })
}

passport.use('local-signup', new LocalStrategy({



}))

