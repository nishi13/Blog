
App.Post = DS.Model.extend({
  title   : DS.attr('string'),
  text : DS.attr('string'),
  author_id: DS.attr('string'),
  tags    :  DS.attr('string'),
  coments : DS.hasMany('App.Coment', {async: true, embedded:'always'}),
  updated_at : DS.attr('date')
});

App.Coment = DS.Model.extend({
  author:DS.attr('string'),
  content:DS.attr('string'),
  updated_at : DS.attr('date'),
  post: DS.belongsTo('App.Post')
});

