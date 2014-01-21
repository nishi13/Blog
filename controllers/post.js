var moongose = require("mongoose");
var Post = moongose.model("Post")


exports.index = function(req, res){
  Post.find(function (err,list){
    res.render('index', { post_list: list });
  })
};

exports.create = function(req, res){
  new Post({
    title : req.param('title'),
    content : req.param('content')
  }).save(function (err, post, count){
    res.redirect('/');
  })
}
