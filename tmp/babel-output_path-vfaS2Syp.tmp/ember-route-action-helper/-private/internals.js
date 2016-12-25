define('ember-route-action-helper/-private/internals', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var ClosureActionModule = undefined;

  if ('ember-htmlbars/keywords/closure-action' in _ember['default'].__loader.registry) {
    ClosureActionModule = _ember['default'].__loader.require('ember-htmlbars/keywords/closure-action');
  } else if ('ember-routing-htmlbars/keywords/closure-action' in _ember['default'].__loader.registry) {
    ClosureActionModule = _ember['default'].__loader.require('ember-routing-htmlbars/keywords/closure-action');
  } else {
    ClosureActionModule = {};
  }

  var ACTION = ClosureActionModule.ACTION;
  exports.ACTION = ACTION;
});