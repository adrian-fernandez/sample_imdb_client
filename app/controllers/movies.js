import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'size'],
  page: 1,
  limit: 10,
  search_q: '',
  search_title: '',
  search_director: '',
  search_year: '',
  search_actor_name: '',
  search_min_rate: '',
  search_max_rate: '',
  resultsFiltered: false,

  count: Ember.computed('model.meta.pagination.last.number', 'model.meta.pagination.self.number', function() {
    const total = this.get('model.meta.pagination.last.number') || this.get('model.meta.pagination.self.number');
    if (!total) return [];
    return new Array(total+1).join('x').split('').map((e,i) => i+1);
  }),
});