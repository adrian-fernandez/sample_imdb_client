define('frontend/tests/views/file-picker.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | views/file-picker.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'views/file-picker.js should pass jshint.');
  });
});