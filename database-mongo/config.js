const passport = require('passport');
const LocalStrategy = require('passprot-local').Strategy;
const bodyParser = require('body-parser');
const db = require('./index');

module.exports = function (passprot) {
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
  (req, userName, password, cb) => {
    new Promise((resolve, reject) => {
      resolve(db.retrieveUser(user));
    })
      .then(user => cb(null, false, req.flash('signupMessage', 'Email taken.')))
      .catch(() => {
        db.insertNewUser(user)
        cb(null, user)
      });
  }
))

// passport.use('local-signin', new LocalStrategy({
//   passReqToCallBack: true
// },
//   (req, userName, password, cb) => {

//   }

// ))




