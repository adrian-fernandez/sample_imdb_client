define('frontend/tests/components/suggest-movie/component.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/suggest-movie/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/suggest-movie/component.js should pass jshint.');
  });
});