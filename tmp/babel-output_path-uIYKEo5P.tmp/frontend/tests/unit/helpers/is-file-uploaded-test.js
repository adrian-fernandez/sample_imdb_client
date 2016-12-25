define('frontend/tests/unit/helpers/is-file-uploaded-test', ['exports', 'frontend/helpers/is-file-uploaded', 'qunit'], function (exports, _frontendHelpersIsFileUploaded, _qunit) {

  (0, _qunit.module)('Unit | Helper | is file uploaded');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _frontendHelpersIsFileUploaded.isFileUploaded)([42]);
    assert.ok(result);
  });
});