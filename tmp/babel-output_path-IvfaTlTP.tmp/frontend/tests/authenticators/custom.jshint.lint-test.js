define('frontend/tests/authenticators/custom.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | authenticators/custom.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/custom.js should pass jshint.');
  });
});