



App.PostsController = Ember.ArrayController.extend({
  actions:{
    search: function() {
      console.log(App.Session.authToken);
      var query =this.get('query');
      this.set('model',this.get('model').filter(function(item, index, enumerable){
        console.log(item.get('title'));
        return (item.get('title') && item.get('title').indexOf(query)!==-1 )|| (item.get('tags') && item.get('tags').indexOf(query)!==-1);
      })
      );
    },
    post: function() {
      var post= App.Post.createRecord({
        title: this.get("title"),
        text: this.get("text"),
        tags: this.get("tags"),
        author_id: App.authAccountId
      });
      post.save();
    },
    login: function(){
      var router = this;
      var username = this.get('username');
      var password = this.get('password');
      if (!Ember.isEmpty(username) && !Ember.isEmpty(password)) {
        $.post('/login', {
          username: username, password: password
        }).done(function(response){
          var sessionData = (response.session || {})
          App.Session.setProperties({
                    authToken:     sessionData.auth_token,
                    authAccountId: sessionData.user_id
                  });
        });
      }
    },
    logout: function (){
        App.Session.setProperties({
                  authToken:     '',
                  authAccountId: ''
                });
    }
  }
});


App.PostController = Ember.ObjectController.extend({
  isEditable: false,
  actions:{
    post: function() {
      var post=this.get('model');
      post.set('title',this.get("title"));
      post.set('content',this.get("content"));
      post.set('tags',this.get("tags"));
      post.save();
      this.set('isEditable',false);
    },
    delete: function() {
      var post=this.get('model');
      post.one('didDelete', this, function () {
            this.transitionTo('posts');
        });
      post.deleteRecord();
      post.save();
    },
    coment: function() {
      var coment= App.Coment.createRecord({
        post: this.get('model'),
        author: this.get("author1"),
        content: this.get("content1"),
        updated_at: new Date()
      });
      coment.save();
    },
     editable: function () {
       this.toggleProperty('isEditable');
     }
  }
});




