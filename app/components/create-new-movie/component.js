import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  suggested_movies: [],

  actions: {
    createMovie: function (model) {
      this.sendAction('createMovie', model);

      this.set('newMovie.title', null);
      this.set('newMovie.director', null);
      this.set('newMovie.year', null);
      this.set('newMovie.imdb_id', null);
      this.set('newMovie.rate', null);
      this.set('newMovie.actors', null);
    }
  }
});
