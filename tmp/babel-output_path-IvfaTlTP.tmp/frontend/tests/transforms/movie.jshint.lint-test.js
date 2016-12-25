define('frontend/tests/transforms/movie.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | transforms/movie.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transforms/movie.js should pass jshint.');
  });
});