define('frontend/models/movie', ['exports', 'ember-data', 'ember-api-actions'], function (exports, _emberData, _emberApiActions) {
  exports['default'] = _emberData['default'].Model.extend({
    poster: _emberData['default'].attr('string'),
    title: _emberData['default'].attr('string'),
    year: _emberData['default'].attr('number'),
    rate: _emberData['default'].attr('string'),
    imdb_id: _emberData['default'].attr('string'),
    director: _emberData['default'].attr(),
    actors: _emberData['default'].attr(),
    getSuggestions: (0, _emberApiActions.collectionAction)({
      path: 'suggestions',
      type: 'get',
      urlType: 'findRecord'
    }),
    getMovie: (0, _emberApiActions.collectionAction)({
      path: 'get_movie',
      type: 'get',
      urlType: 'findRecord'
    })
  });
});