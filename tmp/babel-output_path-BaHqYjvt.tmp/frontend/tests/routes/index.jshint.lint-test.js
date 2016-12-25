define('frontend/tests/routes/index.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 13, col 7, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });
});