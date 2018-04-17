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
  passReqToCallBack: true
},
  (req, email, password, cb) => {
    new Promise((resolve, reject) => {
      resolve(db.retrieveUser(email));
    })
      .then(user => done(null, false, req.flash('signupMessage', 'Email taken.')))
      .catch(() => {
        db.insertNewUser(email)
        done(null, email)
      });
  }
))



