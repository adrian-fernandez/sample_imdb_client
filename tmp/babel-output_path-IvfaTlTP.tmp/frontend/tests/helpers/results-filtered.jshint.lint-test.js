define('frontend/tests/helpers/results-filtered.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/results-filtered.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/results-filtered.js should pass jshint.');
  });
});