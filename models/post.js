var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Post = new Schema({
    user_id : String,
    title   : String,
    content : String,
    tags    : [String],
    coments : [{author:String, content:String, updated_at : {type: Date , default: Date.now}}],
    updated_at : {type: Date , default: Date.now}
});

mongoose.model( 'Post', Post );
mongoose.connect( 'mongodb://localhost/Blog-db' );
