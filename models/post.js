var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Post = new Schema({
    user_id : String,
    title   : String,
    content : String,
    author_id  : Schema.Types.ObjectId,
    tags    : [String],
    coments : [{id:Number, author:String, content:String, updated_at : {type: Date , default: Date.now}}],
    updated_at : {type: Date , default: Date.now}
});

mongoose.model( 'Post', Post );
mongoose.connect( 'mongodb://localhost/Blog-db' );
