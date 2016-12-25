import Ember from 'ember';
import LoginControllerMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:custom',
  errors: []
});