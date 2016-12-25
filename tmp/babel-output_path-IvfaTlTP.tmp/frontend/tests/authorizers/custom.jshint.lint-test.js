define('frontend/tests/authorizers/custom.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | authorizers/custom.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authorizers/custom.js should pass jshint.');
  });
});