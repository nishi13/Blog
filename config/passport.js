var LocalStrategy = require('passport-local').Strategy;
var moongose = require("mongoose");
var User = moongose.model("User");

module.exports = function (passport){
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
