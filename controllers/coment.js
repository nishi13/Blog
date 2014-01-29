var moongose = require("mongoose");
var Post = moongose.model("Post")


//index
exports.index = function(req, res){
  Post.findById (req.params.id, function (err, post){
    if(post){
      res.json(200,{coments:post.coments});
    }
    else{
      res.json(404);
    }
  })
}

//create new coment
exports.create = function(req, res){
  var coment=req.body.coment;
  Post.findById (coment.post_id, function (err, post){
    if(post){
      coment.id=post.coments.length+1;
      console.log(coment);
      post.coments.push (coment)
      post.save(function (err, post, count){
        res.json(201,{post:post});
      })
    }
    else{
      res.json(500,{post:post});
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
