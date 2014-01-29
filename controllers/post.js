var moongose = require("mongoose");
var Post = moongose.model("Post");
var User = moongose.model("User");

//post list
exports.index = function(req, res){
  Post.find(function (err,list){
    res.json(200, {posts:list.sort('-updated_at') });
  })
};

//create new post
exports.create = function(req, res){
  var post = req.body.post;
  console.log(post);
  User.findById(req.cookies.auth_account,function(err,user){
    if (user && user.access_token==req.cookies.auth_token && post.title){
      post.content=post.text;
      delete post.updated_at;
      post.author_id=user._id;
      console.log(post);
      post.tags = post.tags && post.tags.split(' ');
      new Post(post).save(function (err, post, count){
        res.json(201,{post:post});
      })
    }
    else{
      res.json(401,{})
    }
  })
}

//show post
exports.show = function(req,res){
  Post.findById (req.params.id, function (err, post){
    if(post){
      res.json(200,{post:post});
    }
    else{
      res.json(500);
    }
  })
}

//edit post
exports.update =function (req,res) {
  var newpost = req.body.post;
  Post.findById (req.params.id, function (err, post){
    if(post){
      post.title=newpost.title;
      post.content=newpost.text;
      post.tags=post.tags && newpost.tags.split(' ');
      post.save(function (err, post, count){
        console.log('ok')
        res.json(200,{post:post })
      });
    }
    else{
      res.json(500);
    }
  })
}

exports.remove = function (req,res){
  Post.findById (req.params.id, function (err, post){
    if(post){
        post.remove(function (err, post) {
          res.json(204);
        })
    }
    else{
      res.json(204);
    }
  })
}

exports.search = function (req,res){
  console.log('ola');
  Post.find({$or:[{title:req.query.q}, {tags:req.query.q}]}, function (err,list){
    res.render('index', { post_list: list.sort('-updated_at') , req:req});
  });
}
