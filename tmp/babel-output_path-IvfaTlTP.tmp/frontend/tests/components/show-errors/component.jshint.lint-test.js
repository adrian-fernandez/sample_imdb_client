define('frontend/tests/components/show-errors/component.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/show-errors/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/show-errors/component.js should pass jshint.');
  });
});