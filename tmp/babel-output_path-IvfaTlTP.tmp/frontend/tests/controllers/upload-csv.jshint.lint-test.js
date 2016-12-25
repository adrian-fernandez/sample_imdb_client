define('frontend/tests/controllers/upload-csv.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/upload-csv.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/upload-csv.js should pass jshint.');
  });
});