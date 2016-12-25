import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  authenticator: 'authenticator:custom',
  session: service('session'),

  actions: {
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:custom', credentials).catch((message) => {
        this.set('errorMessage', message);
      });
    },

    registerUser: function(model) {
      this.sendAction('registerUser', model);

      this.set('newUser.username', null);
      this.set('newUser.password', null);
      this.set('newUser.password_confirmation', null);
    }
  }
});
