
window.App = Ember.Application.create();
App.Product = DS.Model.extend({ });

App.Store = DS.Store.extend({
   adapter: DS.RESTAdapter.create()
});


Ember.Application.initializer({
  name: 'session',

  initialize: function(container, application) {
    App.Session = Ember.Object.extend({
      init: function() {
        this._super();
        this.set('authToken', $.cookie('auth_token'));
        this.set('authAccountId', $.cookie('auth_account'));
      },

      authTokenChanged: function() {
        $.cookie('auth_token', this.get('authToken'));
      }.observes('authToken'),

      authAccountIdChanged: function() {
        var authAccountId = this.get('authAccountId');
        $.cookie('auth_account', authAccountId);
      }.observes('authAccountId')
    }).create();
  }
});
