import Ember from 'ember';

export function resultsFiltered(params) {
  var all_data = params.join('');
  return (all_data.length > 0);
}

export default Ember.Helper.helper(resultsFiltered);
