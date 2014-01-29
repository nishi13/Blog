var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var moongose = require("mongoose");
var User = moongose.model("User");



module.exports = function (passport){
  passport.use(new BearerStrategy(
    function(token, done) {
      User.findOne({ access_token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
      if (user._id) {
        User.uniqueToken(function(err, token) {
          if(err) return done(err);

          if(!user.access_token) user.set('access_token', token);
          user.save(function(err) {
            if(err) return done(err);
            done(undefined, token);
          });
        });
      }
  });

  passport.deserializeUser(function(user, done) {
      User.findOne( { access_token: token }, function ( err, user ) {
        done( err, user );
      });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password==password) {
          return done(null, user);
        }
        else{
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    }
  ));
}
