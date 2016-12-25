define('frontend/controllers/movies_controller', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].ArrayController.extend({
    pagedContent: pagedArray('content'),

    queryParams: ["page", "perPage"],

    pageBinding: "content.page",
    perPageBinding: "content.perPage",
    totalPagesBinding: "content.total_pages",

    page: 1,
    perPage: 10
  });
});