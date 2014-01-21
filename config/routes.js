var post = require('../controllers/post'),
    coment = require('../controllers/coment'),
    user = require('../controllers/user');

module.exports = function (app,passport){
    app.get('/', post.index);
    app.post('/', post.create);
    app.get ('/post/:id', post.show);
    app.get ('/post/remove/:id', post.remove);
    app.post ('/post/update/:id', post.update);
    app.post ('/post/:id', coment.create);
    app.get ('/coment/remove/:id/:id_coment', coment.remove);
    app.post ('/coment/update/:id/:id_coment', coment.update);
    app.get ('/user/create', user.sing);
    app.post ('/user/create', user.create);

    //login
    app.post('/login',
      passport.authenticate('local', { successRedirect: '/',
                                       failureRedirect: '/asd',
                                       failureFlash: false})
    );
}
