define('frontend/transforms/movie', ['exports', 'ember-data'], function (exports, _emberData) {

  _emberData['default'].JSONTransforms.array = {
    serialize: function serialize(jsonData) {
      return Ember.typeOf(jsonData) == 'array' ? jsonData : [];
    },
    deserialize: function deserialize(externalData) {
      return Ember.typeOf(externalData) == 'array' ? externalData : [];
    }
  };
});