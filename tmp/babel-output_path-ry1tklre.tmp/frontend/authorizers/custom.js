define('frontend/authorizers/custom', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, _ember, _emberSimpleAuthAuthorizersBase) {
  var service = _ember['default'].inject.service;
  exports['default'] = _emberSimpleAuthAuthorizersBase['default'].extend({
    session: _ember['default'].inject.service('session'),

    authorize: function authorize(jqXHR, requestOptions) {
      var accessToken = this.get('session.content.secure.token');
      if (this.get('session.isAuthenticated') && !_ember['default'].isEmpty(accessToken)) {
        jqXHR.setRequestHeader('AUTH-TOKEN', Frontend.get('authToken'));
      }
    }
  });
});