import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('movies', { path: '/movies' });
  this.route('login', { path: '/login' });
  this.route('register', { path: '/register'});
  this.route('new-movie', { path: '/movies/new' });
  this.route('upload-csv', { path: '/movies/upload' });
});

export default Router;
