QUnit.module('JSHint | controllers/movies_controller.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/movies_controller.js should pass jshint.\ncontrollers/movies_controller.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/movies_controller.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
