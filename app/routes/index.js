import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
      this.transitionTo('/');
    }
  }
});
