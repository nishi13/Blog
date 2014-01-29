var moongose = require("mongoose");
var User = moongose.model("User");

 exports.sign = function(req, res){
    res.render('sign');
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

 exports.index = function(req, res){
  res.json(200,res.user)
 }
