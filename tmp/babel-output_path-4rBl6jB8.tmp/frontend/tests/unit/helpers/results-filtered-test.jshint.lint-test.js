define('frontend/tests/unit/helpers/results-filtered-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/helpers/results-filtered-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/results-filtered-test.js should pass jshint.');
  });
});