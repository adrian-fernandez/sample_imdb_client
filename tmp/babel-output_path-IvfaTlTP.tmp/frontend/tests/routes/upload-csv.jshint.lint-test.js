define('frontend/tests/routes/upload-csv.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/upload-csv.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/upload-csv.js should pass jshint.');
  });
});