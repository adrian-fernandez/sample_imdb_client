QUnit.module('JSHint | models/movie.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/movie.js should pass jshint.\nmodels/movie.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/movie.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
