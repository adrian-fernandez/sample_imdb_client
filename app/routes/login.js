import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: service('session'),
  model(params) {
    return this.store.createRecord('user');
  },

  actions: {
    registerUser: function(model) {
      let user = this.store.createRecord('user', {
        username: model.get('username'),
        password: model.get('password'),
        password_confirmation: model.get('password_confirmation'),
      });

      self = this;
      user.save().then(function(obj) {
        self.get('session').authenticate('authenticator:custom', { identification: obj.get('username'), password: obj.get('password') });
        self.transitionTo('movies');
      }).catch((adapterError) => {
        this.controller.set('errors', user.get('errors').toArray());
      });
    }
  },

  setError: function(){
    this.set('error', true);
  },

  unsetError: function(){
    this.set('error', false);
  }
});
