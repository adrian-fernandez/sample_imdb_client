define('ember-cli-pagination/local/route-local-mixin', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Mixin.create({
    findPaged: function findPaged(name) {
      return this.store.find(name);
    }
  });
});