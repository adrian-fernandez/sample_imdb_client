define('frontend/models/director', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string')
  });
});