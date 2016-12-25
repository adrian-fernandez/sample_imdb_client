define('frontend/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTAdapter.extend({
    host: 'http://intuo-backend.herokuapp.com',
    primaryKey: 'id'
  });
});