define('frontend/tests/serializers/movie.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | serializers/movie.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/movie.js should pass jshint.');
  });
});