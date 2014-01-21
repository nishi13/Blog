var moongose = require("mongoose");
var Post = moongose.model("Post")

//create new coment
exports.create = function(req, res){
  Post.findById (req.params.id, function (err, post){
    if(post){
      post.coments.push ({
        id:post.coments.length+1,
        author:req.param('author'),
        content:req.param('content')
      })
      post.save(function (err, post, count){
          res.render('post',{post:post});
      })
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
      post.coments[req.params.id_coment].author=req.param('author');
      post.coments[req.params.id_coment].content=req.param('content');
      post.save(function (err, post, count){
        res.redirect('/post/'+req.params.id);
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
      post.coments.splice(req.params.id_coment-1,1);
      post.coments.map(function(coment,count){
        coment.id=count+1;
      })
      post.save(function (err, post, count){
          res.redirect('/post/'+req.params.id);
      })
    }
    else{
      res.redirect('/');
    }
  })
}
