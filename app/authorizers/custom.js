import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const { service } = Ember.inject;

export default Base.extend({
  session: Ember.inject.service('session'),

  authorize: function(jqXHR, requestOptions) {
    var accessToken = this.get('session.content.secure.token');
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
      jqXHR.setRequestHeader('AUTH-TOKEN', Frontend.get('authToken'));
      jqXHR.setRequestHeader('AUTH-USER', Frontend.get('userName'));
    }
  }
});