define('ember-route-action-helper/helpers/route-action', ['exports', 'ember', 'ember-route-action-helper/-private/internals'], function (exports, _ember, _emberRouteActionHelperPrivateInternals) {
  'use strict';

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  var emberArray = _ember['default'].A;
  var Helper = _ember['default'].Helper;
  var assert = _ember['default'].assert;
  var computed = _ember['default'].computed;
  var typeOf = _ember['default'].typeOf;
  var get = _ember['default'].get;
  var getOwner = _ember['default'].getOwner;
  var run = _ember['default'].run;

  function getRoutes(router) {
    return emberArray(router.router.currentHandlerInfos).mapBy('handler').reverse();
  }

  function getRouteWithAction(router, actionName) {
    var action = undefined;
    var handler = emberArray(getRoutes(router)).find(function (route) {
      var actions = route.actions || route._actions;
      action = actions[actionName];

      return typeOf(action) === 'function';
    });

    return { action: action, handler: handler };
  }

  exports['default'] = Helper.extend({
    router: computed(function () {
      return getOwner(this).lookup('router:main');
    }).readOnly(),

    compute: function compute(_ref) {
      var _ref2 = _toArray(_ref);

      var actionName = _ref2[0];

      var params = _ref2.slice(1);

      var router = get(this, 'router');
      assert('[ember-route-action-helper] Unable to lookup router', router);

      var _getRouteWithAction = getRouteWithAction(router, actionName);

      var action = _getRouteWithAction.action;
      var handler = _getRouteWithAction.handler;

      assert('[ember-route-action-helper] Unable to find action ' + actionName, handler);

      var routeAction = function routeAction() {
        for (var _len = arguments.length, invocationArgs = Array(_len), _key = 0; _key < _len; _key++) {
          invocationArgs[_key] = arguments[_key];
        }

        var args = params.concat(invocationArgs);
        return run.join.apply(run, [handler, action].concat(_toConsumableArray(args)));
      };

      routeAction[_emberRouteActionHelperPrivateInternals.ACTION] = true;

      return routeAction;
    }
  });
});