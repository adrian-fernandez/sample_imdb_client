define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _frontendConfigEnvironment['default'].locationType,
    rootURL: _frontendConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('movies', { path: '/movies' });
    this.route('login', { path: '/login' });
    this.route('register', { path: '/register' });
    this.route('new-movie', { path: '/movies/new' });
    this.route('upload-csv', { path: '/movies/upload' });
  });

  exports['default'] = Router;
});