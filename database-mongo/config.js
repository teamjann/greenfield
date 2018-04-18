const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const db = require('./index');
const bcrypt = require('bcrypt');
const saltRounds = 10;

console.log('config used')

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  })
  passport.use('local-signup', new LocalStrategy({
    passReqToCallBack: true
  },

    async (req, email, password, cb) => {
      console.log('//////////////////')
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          cb(err, null)
        } else {
          const user = await db.insertNewUser({ "user": email, "password": hash });
          if (user === email, ' allready exists') {
            cb(null, false)
          } else {
            cb(null, true);
          }
        }
      }
      )
    }
  ))

  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  },
    async (req, email, password, cb) => {
      console.log(email, password, '////////////////')
      const userData = await db.retrieveUser(email);
      if (userData) { // user data comes back at all... no length
        //let user = userInfo[0];
        bcrypt.compare(password, userData.password, (err, res) => {
          if (err) {
            cb(err, null)
          } else if (res === false) {
            cb(null, false);
          } else {
            cb(null, user);
          }
        })
      } else {
        cb(null, false);
      }
    }

  ))
}





