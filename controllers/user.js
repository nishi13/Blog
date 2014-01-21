var moongose = require("mongoose");
var User = moongose.model("User");

 exports.sing = function(req, res){
    res.render('sing');
 };

 //create new post
 exports.create = function(req, res){
   new User({
     username : req.param('username'),
     password : req.param('password'),
   }).save(function (err, post, count){
     res.redirect('/');
   })
 }
