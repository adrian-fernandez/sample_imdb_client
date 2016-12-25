define('frontend/authenticators/custom', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  var service = _ember['default'].inject.service;
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    session: _ember['default'].inject.service('session'),
    tokenEndpoint: Frontend.SERVICES_HOST + '/sessions',

    restore: function restore(data) {
      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        if (!_ember['default'].isEmpty(data.token)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    authenticate: function authenticate(options) {
      var _this = this;

      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        $.ajax({
          url: _this.tokenEndpoint,
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
        }).then(function (response) {
          Frontend.set('authToken', response.data.attributes.token);
          Frontend.set('userName', response.data.attributes.username);
          _ember['default'].$.ajaxPrefilter(function (options, oriOptions, jqXHR) {
            jqXHR.setRequestHeader("AUTH-TOKEN", response.data.attributes.token);
          });
          _ember['default'].run(function () {
            resolve({
              token: response.data.token,
              userName: response.data.username
            });
          });
        }, function (xhr, status, error) {
          var response = xhr.responseText;
          _ember['default'].run(function () {
            reject(response);
          });
        });
      });
    },

    invalidate: function invalidate() {
      console.log("invalidate...");
      return _ember['default'].RSVP.resolve();
    }
  });
});