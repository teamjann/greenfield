const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('./index');

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Local stratigy for sign up and encription for new user
  passport.use('local-signup', new LocalStrategy(
    async (username, password, cb) => {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          cb(err, null);
        } else {
          const user = await db.insertNewUser({ "email": username, "password": hash });
          if (user === username, ' allready exists') {
            cb(null, false);
          } else {
            cb(null, true);
          };
        };
      }
      );
    }
  ));

  // Local stratigy to login existing user and decrypt password
  passport.use('local-login', new LocalStrategy(
    async (username, password, cb) => {
      const userData = await db.retrieveUser(username);
      if (userData) {
        bcrypt.compare(password, userData.password, (err, res) => {
          if (err) {
            cb(err, null);
          } else if (res === false) {
            cb(null, false);
          } else {
            cb(null, userData);
          }
        })
      } else {
        cb(null, false);
      };
    }
  ));
};





