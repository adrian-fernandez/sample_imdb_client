define('frontend/models/movie', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    poster: _emberData['default'].attr('string'),
    title: _emberData['default'].attr('string'),
    year: _emberData['default'].attr('number'),
    rate: _emberData['default'].attr('number'),
    casting: _emberData['default'].attr('string')
  });
});