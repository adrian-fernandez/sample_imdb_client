define('frontend/helpers/results-filtered', ['exports', 'ember'], function (exports, _ember) {
  exports.resultsFiltered = resultsFiltered;

  function resultsFiltered(params) {
    var all_data = params.join('');
    return all_data.length > 0;
  }

  exports['default'] = _ember['default'].Helper.helper(resultsFiltered);
});