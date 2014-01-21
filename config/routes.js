var post = require('../controllers/post'),
    user = require('../controllers/user');

module.exports = function (app){
    app.get('/', post.index);
    app.get('/users', user.list);
    app.post('/', post.create);
}
