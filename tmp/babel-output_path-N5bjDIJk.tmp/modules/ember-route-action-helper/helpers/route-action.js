function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

import Ember from 'ember';
import { ACTION } from '../-private/internals';

var emberArray = Ember.A;
var Helper = Ember.Helper;
var assert = Ember.assert;
var computed = Ember.computed;
var typeOf = Ember.typeOf;
var get = Ember.get;
var getOwner = Ember.getOwner;
var run = Ember.run;

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

export default Helper.extend({
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

    routeAction[ACTION] = true;

    return routeAction;
  }
});