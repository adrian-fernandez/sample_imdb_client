define('frontend/instance-initializers/session-events', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize(instance) {
    var applicationRoute = instance.container.lookup('route:application');
    var session = instance.container.lookup('service:session');
    session.on('authenticationSucceeded', function () {
      applicationRoute.transitionTo('movies');
    });
    session.on('invalidationSucceeded', function () {
      applicationRoute.transitionTo('login');
    });
  }

  exports['default'] = {
    initialize: initialize,
    name: 'session-events',
    after: 'ember-simple-auth'
  };
});