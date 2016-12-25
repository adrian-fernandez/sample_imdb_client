define('frontend/tests/unit/helpers/results-filtered-test', ['exports', 'frontend/helpers/results-filtered', 'qunit'], function (exports, _frontendHelpersResultsFiltered, _qunit) {

  (0, _qunit.module)('Unit | Helper | results filtered');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _frontendHelpersResultsFiltered.resultsFiltered)([42]);
    assert.ok(result);
  });
});