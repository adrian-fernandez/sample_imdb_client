import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const { service } = Ember.inject;

export default Base.extend({
  session: Ember.inject.service('session'),
  tokenEndpoint: Frontend.SERVICES_HOST + '/sessions',

  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      if (!Ember.isEmpty(data.token)){
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function(options) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      $.ajax({
        url: this.tokenEndpoint,
        type: 'POST',
        data: JSON.stringify({
          username: options.identification,
          password: options.password
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
          widthCredentials: true
        }
      }).then(function(response) {
        Frontend.set('authToken', response.data.attributes.token);
        Frontend.set('userName', response.data.attributes.username);
        Ember.$.ajaxPrefilter(function( options, oriOptions, jqXHR ) {
          jqXHR.setRequestHeader("AUTH-USER", response.data.attributes.username);
          jqXHR.setRequestHeader("AUTH-TOKEN", response.data.attributes.token);
        });
        Ember.run(function() {
          resolve({
            token: response.data.token,
            userName: response.data.username
          });
        });
      }, function(xhr, status, error){
          var response = xhr.responseText;
          Ember.run(function() {
            reject(response);
          });
      });
    });
  },

  invalidate: function() {
    console.log("invalidate...");
    return Ember.RSVP.resolve();
  }
});