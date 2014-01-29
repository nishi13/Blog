var post = require('../controllers/post'),
    coment = require('../controllers/coment'),
    user = require('../controllers/user');

module.exports = function (app,passport){
    // app.get('*', function(request, response) {
    //   console.log(request.query);
    //   return response.sendfile('./app/index.html');
    // });
    app.get('/posts', post.index);
    app.post('/posts', post.create);
    app.get ('/posts/search', post.search);
    app.get ('/posts/:id', post.show);
    app.del ('/posts/:id', post.remove);
    app.put ('/posts/:id', post.update);
    app.post ('/coments', coment.create);
    app.get ('/coments/:id', coment.index);
    app.del ('/coment/remove/:id/:id_coment', coment.remove);
    app.post ('/coment/update/:id/:id_coment', coment.update);
    app.get ('/user/create', user.sign);
    app.post ('/user/create', user.create);
    app.get ('/users', user.index);

    //login
    app.post('/login', passport.authenticate('local', { session: false }), function(req, res) {
        res.json(200,{session:{auth_token:req.user.access_token , user_id:req.user.id}})
    });
}
