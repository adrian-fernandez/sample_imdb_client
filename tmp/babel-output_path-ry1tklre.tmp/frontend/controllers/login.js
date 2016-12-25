define('frontend/controllers/login', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Controller.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
    authenticator: 'authenticator:custom',
    errors: []
  });
});