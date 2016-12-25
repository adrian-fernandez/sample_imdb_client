define('frontend/routes/index', ['exports', 'ember', 'ember-cli-pagination/remote/route-mixin'], function (exports, _ember, _emberCliPaginationRemoteRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberCliPaginationRemoteRouteMixin['default'], {
    perPage: 5,

    model: function model(params) {
      return this.store.findAll('movie', params);
    },

    actions: {
      createMovie: function createMovie(model) {
        var movie = this.store.createRecord('movie', {
          title: model.title,
          year: model.year,
          cast: model.cast
        });
        movie.save();
      }
    }

  });
});