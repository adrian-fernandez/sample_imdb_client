define('frontend/routes/movies', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var service = _ember['default'].inject.service;
  var Route = _ember['default'].Route;
  var set = _ember['default'].set;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: service('session'),

    model: function model(params) {
      return this.store.query('movie', { page: {
          number: params.page,
          limit: params.limit,
          order_field: this.get('order_field'),
          order_direction: this.get('order_direction'),
          actor: this.get('actorId'),
          filter: {
            q: this.get('search_q'),
            title: this.get('search_title'),
            director: this.get('search_director'),
            year: this.get('search_year'),
            actor_name: this.get('search_actor_name'),
            min_rate: this.get('search_min_rate'),
            max_rate: this.get('search_max_rate')
          }
        }
      });
    },

    queryParams: {
      page: {
        refreshModel: true
      },
      limit: {
        refreshModel: true
      }
    },

    actions: {
      logout: function logout() {
        this.get('session').invalidate();
      },
      order: function order(_order, direction) {
        this.set('order_field', _order);
        this.set('order_direction', direction);
        this.controller.set('page', 1);
        this.refresh();
      },
      moviesByActor: function moviesByActor(data) {
        this.controller.set('search_actor_name', data.actorName);
        this.set('search_actor_name', data.actorName);
        this.controller.set('selectedActor', data.actorName);
        this.controller.set('actorName', data.actorName);
        this.refresh();
      },
      moviesByYear: function moviesByYear(data) {
        this.controller.set('search_year', data.year);
        this.set('search_year', data.year);
        this.refresh();
      },
      moviesByDirector: function moviesByDirector(data) {
        this.controller.set('search_director', data.directorName);
        this.set('search_director', data.directorName);
        this.refresh();
      },
      moviesByAllActor: function moviesByAllActor() {
        this.controller.set('search_actor_name', '');
        this.set('search_actor_name', '');
        this.controller.set('selectedActor', '');
        this.refresh();
      },
      moviesByAllQ: function moviesByAllQ() {
        this.controller.set('search_q', '');
        this.set('search_q', '');
        this.refresh();
      },
      moviesByAllDirector: function moviesByAllDirector() {
        this.controller.set('search_director', '');
        this.set('search_director', '');
        this.refresh();
      },
      moviesByAllTitle: function moviesByAllTitle() {
        this.controller.set('search_title', '');
        this.set('search_title', '');
        this.refresh();
      },
      moviesByAllYear: function moviesByAllYear() {
        this.controller.set('search_year', '');
        this.set('search_year', '');
        this.refresh();
      },
      moviesByAllMinRate: function moviesByAllMinRate() {
        this.controller.set('search_min_rate', '');
        this.set('search_min_rate', '');
        this.refresh();
      },
      moviesByAllMaxRate: function moviesByAllMaxRate() {
        this.controller.set('search_max_rate', '');
        this.set('search_max_rate', '');
        this.refresh();
      },
      simpleSearchMovies: function simpleSearchMovies(text) {
        this.set('search_q', text);
        this.controller.set('search_q', text);

        this.refresh();
      },
      advancedSearchMovies: function advancedSearchMovies(title, director, actor_name, min_rate, max_rate, year) {
        this.set('search_title', title);
        this.set('search_director', director);
        this.set('search_actor_name', actor_name);
        this.set('search_year', year);
        this.set('search_min_rate', min_rate);
        this.set('search_max_rate', max_rate);
        this.controller.set('search_title', title);
        this.controller.set('search_director', director);
        this.controller.set('search_actor_name', actor_name);
        this.controller.set('search_year', year);
        this.controller.set('search_min_rate', min_rate);
        this.controller.set('search_max_rate', max_rate);

        this.refresh();
      }
    }
  });
});