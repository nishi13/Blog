var moongose = require("mongoose");
var Post = moongose.model("Post");

//post list
exports.index = function(req, res){
  Post.find(function (err,list){
    res.render('index', { post_list: list , req:req});
  })
};

//create new post
exports.create = function(req, res){
  if (req.user){
    new Post({
      title : req.param('title'),
      content : req.param('content'),
      author_id: req.user.id,
      coments : []
    }).save(function (err, post, count){
      res.redirect('/');
    })

  }
  else{
    res.redirect('/');
  }

}

//show post
exports.show = function(req,res){
  Post.findById (req.params.id, function (err, post){
    if(post){
      res.render('post',{post:post});
    }
    else{
      res.redirect('/');
    }
  })
}

//edit post
exports.update =function (req,res) {
  Post.findById (req.params.id, function (err, post){
    if(post){
      post.title=req.param('title')
      post.content=req.param('content')
      post.save(function (err, post, count){
        res.render('post',{post:post});
      })
    }
    else{
      res.redirect('/');
    }
  })
}

exports.remove = function (req,res){
  Post.findById (req.params.id, function (err, post){
    if(post){
      post.remove(function (err, post) {
        res.redirect('/');
      })
    }
    else{
      res.redirect('/');
    }
  })
}
