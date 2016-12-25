define('frontend/tests/unit/serializers/movie-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/serializers/movie-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/movie-test.js should pass jshint.');
  });
});