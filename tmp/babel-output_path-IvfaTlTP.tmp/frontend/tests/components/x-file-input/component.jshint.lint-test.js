define('frontend/tests/components/x-file-input/component.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/x-file-input/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/x-file-input/component.js should pass jshint.\ncomponents/x-file-input/component.js: line 31, col 46, [\'uploaded_movies\'] is better written in dot notation.\ncomponents/x-file-input/component.js: line 32, col 46, [\'imported_movies\'] is better written in dot notation.\ncomponents/x-file-input/component.js: line 33, col 43, [\'error_movies\'] is better written in dot notation.\n\n3 errors');
  });
});