define('frontend/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    username: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string'),
    password_confirmation: _emberData['default'].attr('string')
  });
});