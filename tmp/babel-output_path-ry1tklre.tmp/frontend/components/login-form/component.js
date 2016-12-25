define('frontend/components/login-form/component', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Component.extend({
    authenticator: 'authenticator:custom',
    session: service('session'),

    actions: {
      authenticate: function authenticate() {
        var _this = this;

        var credentials = this.getProperties('identification', 'password');
        this.get('session').authenticate('authenticator:custom', credentials)['catch'](function (message) {
          _this.set('errorMessage', message);
        });
      },

      registerUser: function registerUser(model) {
        this.sendAction('registerUser', model);

        this.set('newUser.username', null);
        this.set('newUser.password', null);
        this.set('newUser.password_confirmation', null);
      }
    }
  });
});