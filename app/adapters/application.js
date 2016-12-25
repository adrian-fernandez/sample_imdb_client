import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  //host: 'http://intuo-backend.herokuapp.com',
  host: Frontend.SERVICES_HOST,
  primaryKey: 'id',

  ajaxError: function(jqXHR) {
    var error, errors, jsonErrors, response;
    error = this._super(jqXHR);

    if (jqXHR && jqXHR.status === 422) {
      response = Ember.$.parseJSON(jqXHR.responseText);
      errors = {};
      if (response.errors !== null) {
        jsonErrors = response.errors;
        Ember.keys(jsonErrors).forEach(function(key) {
          errors[Ember.String.camelize(key)] = jsonErrors[key];
          return errors[Ember.String.camelize(key)];
        });
      }
      return new DS.InvalidError(errors);
    } else {
      return error;
    }
    alert("AJAX ERROR");
  }
});
