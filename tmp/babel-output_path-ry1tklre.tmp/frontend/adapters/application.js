define('frontend/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTAdapter.extend({
    //host: 'http://intuo-backend.herokuapp.com',
    host: Frontend.SERVICES_HOST,
    primaryKey: 'id',

    ajaxError: function ajaxError(jqXHR) {
      var error, errors, jsonErrors, response;
      error = this._super(jqXHR);

      if (jqXHR && jqXHR.status === 422) {
        response = Ember.$.parseJSON(jqXHR.responseText);
        errors = {};
        if (response.errors !== null) {
          jsonErrors = response.errors;
          Ember.keys(jsonErrors).forEach(function (key) {
            errors[Ember.String.camelize(key)] = jsonErrors[key];
            return errors[Ember.String.camelize(key)];
          });
        }
        return new _emberData['default'].InvalidError(errors);
      } else {
        return error;
      }
      alert("AJAX ERROR");
    }
  });
});