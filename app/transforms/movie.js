import DS from 'ember-data';

DS.JSONTransforms.array = {
  serialize: function(jsonData) {
    return Ember.typeOf(jsonData) == 'array' ? jsonData : [];
  },
  deserialize: function(externalData) {
    return Ember.typeOf(externalData) == 'array' ? externalData : [];
  }
};