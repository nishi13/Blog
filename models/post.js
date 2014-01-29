var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var PostSchema = new Schema({
    title   : String,
    content : String,
    author_id  : Schema.Types.ObjectId,
    tags    : [String],
    coments : [{id:Number, author:String, content:String, updated_at : {type: Date , default: Date.now}}],
    updated_at : {type: Date , default: Date.now}
});

var toJSON = PostSchema.methods.toJSON;
PostSchema.methods.toJSON = function() {
  var obj = toJSON ? toJSON.apply(this, arguments) :
            this.toObject.apply(this, arguments);
  obj.id = this.id;
  delete obj._id;
  obj.text=obj.content
  delete obj.content
  obj.tags=obj.tags.reduce(function(previousValue, currentValue, index, array){
    return previousValue + currentValue + ' ';
  },'');
  return obj;
};

mongoose.model( 'Post', PostSchema );
mongoose.connect( 'mongodb://localhost/Blog-db' );
