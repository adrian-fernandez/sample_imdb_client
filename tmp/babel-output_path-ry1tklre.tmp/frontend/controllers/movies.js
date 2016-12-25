define('frontend/controllers/movies', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
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

    count: _ember['default'].computed('model.meta.pagination.last.number', 'model.meta.pagination.self.number', function () {
      var total = this.get('model.meta.pagination.last.number') || this.get('model.meta.pagination.self.number');
      if (!total) return [];
      return new Array(total + 1).join('x').split('').map(function (e, i) {
        return i + 1;
      });
    })
  });
});