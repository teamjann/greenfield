const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const db = require('./index');
const bcrypt = require('bcrypt');
const salt = 20;

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  })
}

passport.use('local-signup', new LocalStrategy({
  passReqToCallBack: true
},
  async (req, username, password, cb) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        cb(err, null)
      } else {
        const user = await db.insertNewUser(req.body, hash); //accept hash value?
        if (user === user.email, ' allready exists') {
          cb(err, null)
        } else {
          let userData = await db.retrieveUser(req.body);
          cb(null, userData)
        }
      }
    }
    )
  }
))

passport.use('local-login', new LocalStrategy({
  passReqToCallback: true
},
  async (req, username, password, cb) => {
    const userData = await db.retrieveUser(req.body);
    if (userData) { // user data comes back at all...
      //let user = userInfo[0];
      bcrypt.compare(password, user.password, (err, res) => {
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




