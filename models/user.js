var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    username   : String,
    password   : { type: String , default: '', private: true },
    access_token    : { type: String , default: '', private: true }
});

var toJSON = UserSchema.methods.toJSON;
UserSchema.methods.toJSON = function() {
  var obj = toJSON ? toJSON.apply(this, arguments) :
            this.toObject.apply(this, arguments);
  obj.id = this.id;
  delete obj._id;
  return obj;
};

var randomToken = function() {
  var chars = '_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      token = (Date.now()) + '_';
  for ( var x = 0; x < 16; x++ ) {
    var i = Math.floor( Math.random() * 62 );
    token += chars.charAt( i );
  }
  return token;
};

/**
 * Generate an Unique Random Token
 */

UserSchema.statics.uniqueToken = function(cb) {
  // Get a random token
  var token = randomToken();

  // Verify if any users are using it
  this
    .count({ access_token: token })
    .limit(1)
    .exec( function (err, token_taken) {
      if(err) return cb(err);

      // If any user is using this token - try again (this may be a problem)
      // Generating random tokens as above isn't recomended.
      if(token_taken) return this.uniqueToken(cb);

      cb(undefined, token);
    }.bind(this) );
};

mongoose.model( 'User', UserSchema );
