define('frontend/routes/index', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),

    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
        this.transitionTo('/');
      }
    }
  });
});