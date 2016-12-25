define('frontend/tests/instance-initializers/session-events.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | instance-initializers/session-events.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/session-events.js should pass jshint.');
  });
});