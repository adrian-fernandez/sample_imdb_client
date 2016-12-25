define('frontend/tests/integration/components/create-new-movie/component-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/create-new-movie/component-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/create-new-movie/component-test.js should pass jshint.');
  });
});