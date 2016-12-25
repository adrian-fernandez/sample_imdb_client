define('frontend/routes/login', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {
    session: service('session'),
    model: function model(params) {
      return this.store.createRecord('user');
    },

    actions: {
      registerUser: function registerUser(model) {
        var _this = this;

        var user = this.store.createRecord('user', {
          username: model.get('username'),
          password: model.get('password'),
          password_confirmation: model.get('password_confirmation')
        });

        self = this;
        user.save().then(function (obj) {
          self.get('session').authenticate('authenticator:custom', { identification: obj.get('username'), password: obj.get('password') });
          self.transitionToRoute('movies');
        })['catch'](function (adapterError) {
          _this.controller.set('errors', user.get('errors').toArray());
        });
      }
    },

    setError: function setError() {
      this.set('error', true);
    },

    unsetError: function unsetError() {
      this.set('error', false);
    }
  });
});