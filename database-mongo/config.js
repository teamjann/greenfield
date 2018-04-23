const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./index');

const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = function (passport) {

  // puts user session info in a cookie
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // confirms user cookie is legit
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Local stratigy for sign up and encription for new user
  passport.use(
    'local-signup',
    new LocalStrategy(async (username, password, cb) => {
      // hashes password and stores it
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          cb(err, null);
        } else {
          const user = await db.insertNewUser({ email: username, password: hash });
          if ((user === username, ' allready exists')) {
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      });
    }),
  );

  // Local stratigy to login existing user and decrypt password
  passport.use(
    'local-login',
    new LocalStrategy(async (username, password, cb) => {
      const userData = await db.retrieveUser(username);
      if (userData) {
        // unhashes stored password and compares to user input
        bcrypt.compare(password, userData.password, (err, res) => {
          if (err) {
            cb(err, null);
          } else if (res === false) {
            cb(null, false);
          } else {
            cb(null, userData);
          }
        });
      } else {
        cb(null, false);
      }
    }),
  );
};

// further strategy could be added for O-auth... signing in with google facebook ect.
