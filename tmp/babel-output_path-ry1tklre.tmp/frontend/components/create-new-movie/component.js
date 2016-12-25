define('frontend/components/create-new-movie/component', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Component.extend({
    session: service('session'),
    suggested_movies: [],

    actions: {
      createMovie: function createMovie(model) {
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
});