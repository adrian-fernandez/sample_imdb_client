define('frontend/models/actor', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    photo: _emberData['default'].attr('string')
  });
});