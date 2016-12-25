define('frontend/tests/integration/components/actor-data/component-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/actor-data/component-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/actor-data/component-test.js should pass jshint.');
  });
});