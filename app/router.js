App.Router.map(function() {
  this.resource('posts' ,{path:'/'});
  this.resource('post' ,{path:'/posts/:post_id'});
  this.route('sign');
});
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});

App.UserRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  }
});
