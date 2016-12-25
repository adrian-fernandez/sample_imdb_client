define('frontend/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session')
  });
});