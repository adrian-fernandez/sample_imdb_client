"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('frontend/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTAdapter.extend({
    //host: 'http://intuo-backend.herokuapp.com',
    host: Frontend.SERVICES_HOST,
    primaryKey: 'id',

    ajaxError: function ajaxError(jqXHR) {
      var error, errors, jsonErrors, response;
      error = this._super(jqXHR);

      if (jqXHR && jqXHR.status === 422) {
        response = Ember.$.parseJSON(jqXHR.responseText);
        errors = {};
        if (response.errors !== null) {
          jsonErrors = response.errors;
          Ember.keys(jsonErrors).forEach(function (key) {
            errors[Ember.String.camelize(key)] = jsonErrors[key];
            return errors[Ember.String.camelize(key)];
          });
        }
        return new _emberData['default'].InvalidError(errors);
      } else {
        return error;
      }
      alert("AJAX ERROR");
    }
  });
});
define('frontend/app', ['exports', 'ember', 'frontend/resolver', 'ember-load-initializers', 'frontend/config/environment'], function (exports, _ember, _frontendResolver, _emberLoadInitializers, _frontendConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _frontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _frontendConfigEnvironment['default'].podModulePrefix,
    Resolver: _frontendResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _frontendConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('frontend/authenticators/custom', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  var service = _ember['default'].inject.service;
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    session: _ember['default'].inject.service('session'),
    tokenEndpoint: Frontend.SERVICES_HOST + '/sessions',

    restore: function restore(data) {
      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        if (!_ember['default'].isEmpty(data.token)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    authenticate: function authenticate(options) {
      var _this = this;

      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        $.ajax({
          url: _this.tokenEndpoint,
          type: 'POST',
          data: JSON.stringify({
            username: options.identification,
            password: options.password
          }),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json',
          crossDomain: true,
          xhrFields: {
            widthCredentials: true
          }
        }).then(function (response) {
          Frontend.set('authToken', response.data.attributes.token);
          Frontend.set('userName', response.data.attributes.username);
          _ember['default'].$.ajaxPrefilter(function (options, oriOptions, jqXHR) {
            jqXHR.setRequestHeader("AUTH-TOKEN", response.data.attributes.token);
          });
          _ember['default'].run(function () {
            resolve({
              token: response.data.attributes.token,
              userName: response.data.attributes.username
            });
          });
        }, function (xhr, status, error) {
          var response = xhr.responseText;
          _ember['default'].run(function () {
            reject(response);
          });
        });
      });
    },

    invalidate: function invalidate() {
      console.log("invalidate...");
      return _ember['default'].RSVP.resolve();
    }
  });
});
define('frontend/authorizers/custom', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, _ember, _emberSimpleAuthAuthorizersBase) {
  var service = _ember['default'].inject.service;
  exports['default'] = _emberSimpleAuthAuthorizersBase['default'].extend({
    session: _ember['default'].inject.service('session'),

    authorize: function authorize(jqXHR, requestOptions) {
      var accessToken = this.get('session.content.secure.token');
      if (this.get('session.isAuthenticated') && !_ember['default'].isEmpty(accessToken)) {
        jqXHR.setRequestHeader('AUTH-TOKEN', Frontend.get('authToken'));
      }
    }
  });
});
define('frontend/components/bs-accordion-item', ['exports', 'ember-bootstrap/components/bs-accordion-item'], function (exports, _emberBootstrapComponentsBsAccordionItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsAccordionItem['default'];
    }
  });
});
define('frontend/components/bs-accordion', ['exports', 'ember-bootstrap/components/bs-accordion'], function (exports, _emberBootstrapComponentsBsAccordion) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsAccordion['default'];
    }
  });
});
define('frontend/components/bs-alert', ['exports', 'ember-bootstrap/components/bs-alert'], function (exports, _emberBootstrapComponentsBsAlert) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsAlert['default'];
    }
  });
});
define('frontend/components/bs-button-group', ['exports', 'ember-bootstrap/components/bs-button-group'], function (exports, _emberBootstrapComponentsBsButtonGroup) {
  exports['default'] = _emberBootstrapComponentsBsButtonGroup['default'];
});
define('frontend/components/bs-button', ['exports', 'ember-bootstrap/components/bs-button'], function (exports, _emberBootstrapComponentsBsButton) {
  exports['default'] = _emberBootstrapComponentsBsButton['default'];
});
define('frontend/components/bs-collapse', ['exports', 'ember-bootstrap/components/bs-collapse'], function (exports, _emberBootstrapComponentsBsCollapse) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsCollapse['default'];
    }
  });
});
define('frontend/components/bs-dropdown-button', ['exports', 'ember-bootstrap/components/bs-dropdown-button'], function (exports, _emberBootstrapComponentsBsDropdownButton) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsDropdownButton['default'];
    }
  });
});
define('frontend/components/bs-dropdown-menu', ['exports', 'ember-bootstrap/components/bs-dropdown-menu'], function (exports, _emberBootstrapComponentsBsDropdownMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsDropdownMenu['default'];
    }
  });
});
define('frontend/components/bs-dropdown-toggle', ['exports', 'ember-bootstrap/components/bs-dropdown-toggle'], function (exports, _emberBootstrapComponentsBsDropdownToggle) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsDropdownToggle['default'];
    }
  });
});
define('frontend/components/bs-dropdown', ['exports', 'ember-bootstrap/components/bs-dropdown'], function (exports, _emberBootstrapComponentsBsDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsDropdown['default'];
    }
  });
});
define('frontend/components/bs-form-element', ['exports', 'ember-bootstrap/components/bs-form-element'], function (exports, _emberBootstrapComponentsBsFormElement) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsFormElement['default'];
    }
  });
});
define('frontend/components/bs-form-group', ['exports', 'ember-bootstrap/components/bs-form-group'], function (exports, _emberBootstrapComponentsBsFormGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsFormGroup['default'];
    }
  });
});
define('frontend/components/bs-form', ['exports', 'ember-bootstrap/components/bs-form'], function (exports, _emberBootstrapComponentsBsForm) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsForm['default'];
    }
  });
});
define('frontend/components/bs-input', ['exports', 'ember-bootstrap/components/bs-input'], function (exports, _emberBootstrapComponentsBsInput) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsInput['default'];
    }
  });
});
define('frontend/components/bs-modal-backdrop', ['exports', 'ember-bootstrap/components/bs-modal-backdrop'], function (exports, _emberBootstrapComponentsBsModalBackdrop) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalBackdrop['default'];
    }
  });
});
define('frontend/components/bs-modal-body', ['exports', 'ember-bootstrap/components/bs-modal-body'], function (exports, _emberBootstrapComponentsBsModalBody) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalBody['default'];
    }
  });
});
define('frontend/components/bs-modal-dialog', ['exports', 'ember-bootstrap/components/bs-modal-dialog'], function (exports, _emberBootstrapComponentsBsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalDialog['default'];
    }
  });
});
define('frontend/components/bs-modal-footer', ['exports', 'ember-bootstrap/components/bs-modal-footer'], function (exports, _emberBootstrapComponentsBsModalFooter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalFooter['default'];
    }
  });
});
define('frontend/components/bs-modal-header', ['exports', 'ember-bootstrap/components/bs-modal-header'], function (exports, _emberBootstrapComponentsBsModalHeader) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalHeader['default'];
    }
  });
});
define('frontend/components/bs-modal', ['exports', 'ember-bootstrap/components/bs-modal'], function (exports, _emberBootstrapComponentsBsModal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModal['default'];
    }
  });
});
define('frontend/components/bs-nav-item', ['exports', 'ember-bootstrap/components/bs-nav-item'], function (exports, _emberBootstrapComponentsBsNavItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavItem['default'];
    }
  });
});
define('frontend/components/bs-nav', ['exports', 'ember-bootstrap/components/bs-nav'], function (exports, _emberBootstrapComponentsBsNav) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNav['default'];
    }
  });
});
define('frontend/components/bs-navbar-content', ['exports', 'ember-bootstrap/components/bs-navbar-content'], function (exports, _emberBootstrapComponentsBsNavbarContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavbarContent['default'];
    }
  });
});
define('frontend/components/bs-navbar-nav', ['exports', 'ember-bootstrap/components/bs-navbar-nav'], function (exports, _emberBootstrapComponentsBsNavbarNav) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavbarNav['default'];
    }
  });
});
define('frontend/components/bs-navbar-toggle', ['exports', 'ember-bootstrap/components/bs-navbar-toggle'], function (exports, _emberBootstrapComponentsBsNavbarToggle) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavbarToggle['default'];
    }
  });
});
define('frontend/components/bs-navbar', ['exports', 'ember-bootstrap/components/bs-navbar'], function (exports, _emberBootstrapComponentsBsNavbar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavbar['default'];
    }
  });
});
define('frontend/components/bs-popover-element', ['exports', 'ember-bootstrap/components/bs-popover-element'], function (exports, _emberBootstrapComponentsBsPopoverElement) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsPopoverElement['default'];
    }
  });
});
define('frontend/components/bs-popover', ['exports', 'ember-bootstrap/components/bs-popover'], function (exports, _emberBootstrapComponentsBsPopover) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsPopover['default'];
    }
  });
});
define('frontend/components/bs-progress-bar', ['exports', 'ember-bootstrap/components/bs-progress-bar'], function (exports, _emberBootstrapComponentsBsProgressBar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsProgressBar['default'];
    }
  });
});
define('frontend/components/bs-progress', ['exports', 'ember-bootstrap/components/bs-progress'], function (exports, _emberBootstrapComponentsBsProgress) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsProgress['default'];
    }
  });
});
define('frontend/components/bs-select', ['exports', 'ember-bootstrap/components/bs-select'], function (exports, _emberBootstrapComponentsBsSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsSelect['default'];
    }
  });
});
define('frontend/components/bs-tab-pane', ['exports', 'ember-bootstrap/components/bs-tab-pane'], function (exports, _emberBootstrapComponentsBsTabPane) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsTabPane['default'];
    }
  });
});
define('frontend/components/bs-tab', ['exports', 'ember-bootstrap/components/bs-tab'], function (exports, _emberBootstrapComponentsBsTab) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsTab['default'];
    }
  });
});
define('frontend/components/bs-textarea', ['exports', 'ember-bootstrap/components/bs-textarea'], function (exports, _emberBootstrapComponentsBsTextarea) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsTextarea['default'];
    }
  });
});
define('frontend/components/bs-tooltip-element', ['exports', 'ember-bootstrap/components/bs-tooltip-element'], function (exports, _emberBootstrapComponentsBsTooltipElement) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsTooltipElement['default'];
    }
  });
});
define('frontend/components/bs-tooltip', ['exports', 'ember-bootstrap/components/bs-tooltip'], function (exports, _emberBootstrapComponentsBsTooltip) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsTooltip['default'];
    }
  });
});
define('frontend/components/create-new-movie/component', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Component.extend({
    session: service('session'),
    suggested_movies: [],

    actions: {
      createMovie: function createMovie(model) {
        this.sendAction('createMovie', model);

        this.set('newMovie.title', null);
        this.set('newMovie.director', null);
        this.set('newMovie.year', null);
        this.set('newMovie.imdb_id', null);
        this.set('newMovie.rate', null);
        this.set('newMovie.actors', null);
      }
    }
  });
});
define("frontend/components/create-new-movie/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "stGU8ydx", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container col-md-6\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"NewMovie\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"fieldset\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"legend\",[]],[\"flush-element\"],[\"text\",\"New movie\"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"append\",[\"helper\",[\"show-errors\"],null,[[\"errors\"],[[\"get\",[\"errors\"]]]]],false],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"helper\",[\"concat\"],[[\"get\",[\"elementId\"]],\"-title\"],null]]]],[\"flush-element\"],[\"text\",\"*Title of the movie\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"class\",\"required\"],[[\"get\",[\"newMovie\",\"title\"]],\"Title of the movie\",\"form-control\",true]]],false],[\"text\",\"\\n          \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"static-attr\",\"class\",\"btn btn-info input-group-addon\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"route-action\"],[\"guessMovie\",[\"get\",[\"newMovie\",\"title\"]]],null]]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"fa-icon\"],[\"search\"],null],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"helper\",[\"concat\"],[[\"get\",[\"elementId\"]],\"-director\"],null]]]],[\"flush-element\"],[\"text\",\"Director\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"id\",\"class\"],[[\"get\",[\"newMovie\",\"director\"]],\"Name of the director\",[\"helper\",[\"concat\"],[[\"get\",[\"elementId\"]],\"-director\"],null],\"form-control\"]]],false],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container col-md-6\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"helper\",[\"concat\"],[[\"get\",[\"elementId\"]],\"-year\"],null]]]],[\"flush-element\"],[\"text\",\"Year\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"id\",\"class\",\"type\",\"step\",\"min\"],[[\"get\",[\"newMovie\",\"year\"]],\"Year\",[\"helper\",[\"concat\"],[[\"get\",[\"elementId\"]],\"-year\"],null],\"form-control\",\"number\",\"1\",\"1890\"]]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container col-md-6\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"helper\",[\"concat\"],[[\"get\",[\"elementId\"]],\"-rate\"],null]]]],[\"flush-element\"],[\"text\",\"Rate\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"id\",\"class\",\"type\",\"step\",\"min\",\"max\"],[[\"get\",[\"newMovie\",\"rate\"]],\"Rate\",[\"helper\",[\"concat\"],[[\"get\",[\"elementId\"]],\"-rate\"],null],\"form-control\",\"number\",\"0.1\",\"0.0\",\"10.0\"]]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"helper\",[\"concat\"],[[\"get\",[\"elementId\"]],\"-actors\"],null]]]],[\"flush-element\"],[\"text\",\"Actors\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"id\",\"class\"],[[\"get\",[\"newMovie\",\"actors\"]],\"Name of the actors\",[\"helper\",[\"concat\"],[[\"get\",[\"elementId\"]],\"-actors\"],null],\"form-control\"]]],false],[\"text\",\"\\n        \"],[\"open-element\",\"small\",[]],[\"static-attr\",\"class\",\"form-text text-muted\"],[\"flush-element\"],[\"text\",\"Enter names splitted by commas (i.e.: Robert de Niro, Al Pacino, Edward Norton).\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"type\"],[[\"get\",[\"newMovie\",\"poster\"]],\"hidden\"]]],false],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"type\"],[[\"get\",[\"newMovie\",\"imdb_id\"]],\"hidden\"]]],false],[\"text\",\"\\n\\n      \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"btn btn-info\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createMovie\",[\"get\",[\"newMovie\"]]]],[\"flush-element\"],[\"text\",\"Create movie\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"errorMessage\"]]],null,4],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container col-md-6\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"suggestedMovies\"]]],null,3],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"a\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"suggestedMovie\",\"added\"]],\"exists\",\"new\"],null]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"route-action\"],[\"importMovie\",[\"get\",[\"suggestedMovie\",\"imdb_id\"]]],null]]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-mail-reply\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"concat\",[[\"unknown\",[\"suggestedMovie\",\"poster\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"suggestedMovie\",\"title\"]],false],[\"text\",\" (\"],[\"append\",[\"unknown\",[\"suggestedMovie\",\"year\"]],false],[\"text\",\")\\n          \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"suggestedMovie\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"suggestedMovies\"]]],null,0]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"loading\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Work in progress, please wait...\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/spinner.gif\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"suggestions-title\"],[\"flush-element\"],[\"text\",\"Suggestions for \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"newMovie\",\"title\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"suggested-movies\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isLoadingImport\"]]],null,2,1],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert alert-danger\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Error:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"errorMessage\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/components/create-new-movie/template.hbs" } });
});
define('frontend/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('frontend/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _emberFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('frontend/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _emberFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaList['default'];
    }
  });
});
define('frontend/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _emberFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaStack['default'];
    }
  });
});
define('frontend/components/file-dropzone', ['exports', 'ember-file-upload/components/file-dropzone/component'], function (exports, _emberFileUploadComponentsFileDropzoneComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadComponentsFileDropzoneComponent['default'];
    }
  });
});
define('frontend/components/file-upload', ['exports', 'ember-file-upload/components/file-upload/component'], function (exports, _emberFileUploadComponentsFileUploadComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadComponentsFileUploadComponent['default'];
    }
  });
});
define('frontend/components/login-form/component', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Component.extend({
    authenticator: 'authenticator:custom',
    session: service('session'),

    actions: {
      authenticate: function authenticate() {
        var _this = this;

        var credentials = this.getProperties('identification', 'password');
        this.get('session').authenticate('authenticator:custom', credentials)['catch'](function (message) {
          _this.set('errorMessage', message);
        });
      },

      registerUser: function registerUser(model) {
        this.sendAction('registerUser', model);

        this.set('newUser.username', null);
        this.set('newUser.password', null);
        this.set('newUser.password_confirmation', null);
      }
    }
  });
});
define("frontend/components/login-form/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "IkWPUe7K", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"loginbox\"],[\"static-attr\",\"style\",\"margin-top:50px;\"],[\"static-attr\",\"class\",\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\"],[\"flush-element\"],[\"text\",\"                    \\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-info\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-heading\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-title\"],[\"flush-element\"],[\"text\",\"Login\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"     \\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"errorMessage\"]]],null,0],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"display:none\"],[\"static-attr\",\"id\",\"login-alert\"],[\"static-attr\",\"class\",\"alert alert-danger col-sm-12\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"authenticate\"],[[\"on\",\"class\"],[\"submit\",\"form-horizontal\"]]],[\"flush-element\"],[\"text\",\"  \\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"margin-bottom: 25px\"],[\"static-attr\",\"class\",\"input-group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"input-group-addon\"],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-user\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"class\"],[[\"get\",[\"identification\"]],\"Enter username\",\"form-control\"]]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"margin-bottom: 25px\"],[\"static-attr\",\"class\",\"input-group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"input-group-addon\"],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-lock\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"class\",\"type\"],[[\"get\",[\"password\"]],\"Enter password\",\"form-control\",\"password\"]]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"margin-top:10px\"],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12 controls\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"btn-login\"],[\"static-attr\",\"class\",\"btn btn-success\"],[\"flush-element\"],[\"text\",\"Login\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-12 control\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"border-top: 1px solid#888; padding-top:15px; font-size:85%\"],[\"flush-element\"],[\"text\",\"Don't have an account! \\n                \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"onClick\",\"$('#loginbox').hide(); $('#signupbox').show()\"],[\"flush-element\"],[\"text\",\"Register Here\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"  \\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"signupbox\"],[\"static-attr\",\"style\",\"display:none; margin-top:50px\"],[\"static-attr\",\"class\",\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-info\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-heading\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-title\"],[\"flush-element\"],[\"text\",\"Register\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"float:right; font-size: 85%; position: relative; top:-10px\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"id\",\"signinlink\"],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"onclick\",\"$('#signupbox').hide(); $('#loginbox').show()\"],[\"flush-element\"],[\"text\",\"Login\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"  \\n\\n      \"],[\"append\",[\"helper\",[\"show-errors\"],null,[[\"errors\"],[[\"get\",[\"errors\"]]]]],false],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"NewUser\"],[\"static-attr\",\"class\",\"form-horizontal\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"signupalert\"],[\"static-attr\",\"style\",\"display:none\"],[\"static-attr\",\"class\",\"alert alert-danger\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Error:\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"static-attr\",\"class\",\"col-md-3 control-label\"],[\"flush-element\"],[\"text\",\"Username\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-9\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"class\",\"id\",\"required\"],[[\"get\",[\"newUser\",\"username\"]],\"User username\",\"form-control\",\"username\",true]]],false],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password\"],[\"static-attr\",\"class\",\"col-md-3 control-label\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-9\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"class\",\"type\",\"id\",\"required\"],[[\"get\",[\"newUser\",\"password\"]],\"Enter password\",\"form-control\",\"password\",\"password\",true]]],false],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password\"],[\"static-attr\",\"class\",\"col-md-3 control-label\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-9\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"class\",\"type\",\"id\",\"required\"],[[\"get\",[\"newUser\",\"password_confirmation\"]],\"Confirm password\",\"form-control\",\"password\",\"password_confirmation\",true]]],false],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"comment\",\" Button \"],[\"text\",\"                                        \\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-offset-3 col-md-9\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-info\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"registerUser\",[\"get\",[\"newUser\"]]]],[\"flush-element\"],[\"text\",\"Register\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n     \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"error-panel\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert alert-danger\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Login failed:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"errorMessage\"]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/components/login-form/template.hbs" } });
});
define('frontend/components/models-select', ['exports', 'ember-models-table/components/models-select'], function (exports, _emberModelsTableComponentsModelsSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModelsTableComponentsModelsSelect['default'];
    }
  });
});
define('frontend/components/models-table-server-paginated', ['exports', 'ember-models-table/components/models-table-server-paginated'], function (exports, _emberModelsTableComponentsModelsTableServerPaginated) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModelsTableComponentsModelsTableServerPaginated['default'];
    }
  });
});
define('frontend/components/models-table', ['exports', 'ember-models-table/components/models-table'], function (exports, _emberModelsTableComponentsModelsTable) {
  exports['default'] = _emberModelsTableComponentsModelsTable['default'];
});
define('frontend/components/movie-data/component', ['exports', 'ember', 'frontend/helpers/str-contains'], function (exports, _ember, _frontendHelpersStrContains) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    isDetailHidden: true,
    actorName: 'Casting: ',

    actions: {
      toggleDetailHidden: function toggleDetailHidden() {
        this.set('isDetailHidden', !this.isDetailHidden);
      },
      hideDetail: function hideDetail() {
        this.set('isDetailHidden', false);
      },
      moviesByActor: function moviesByActor(actorId, actorName) {
        this.set('isDetailHidden', true);
        this.sendAction('moviesByActor', { actorId: actorId, actorName: actorName });
      },
      moviesByYear: function moviesByYear(year) {
        this.sendAction('moviesByYear', { year: year });
      },
      moviesByDirector: function moviesByDirector(directorName) {
        this.sendAction('moviesByDirector', { directorName: directorName });
      },
      selectedActor: function selectedActor(actorName) {
        this.set('actorName', actorName);
      },
      unselectedActor: function unselectedActor() {
        this.set('actorName', 'Casting: ');
      }
    }
  });
});
define("frontend/components/movie-data/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "aFbdK/UH", "block": "{\"statements\":[[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"movie-poster\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"arg\",[\"movie\",\"poster\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"toggleDetailHidden\"]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"movies\"],[[\"class\"],[\"movie-title\"]],1],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByDirector\",[\"arg\",[\"movie\",\"director\",\"name\"]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"arg\",[\"movie\",\"director\",\"name\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByYear\",[\"arg\",[\"movie\",\"year\"]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"arg\",[\"movie\",\"year\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"arg\",[\"movie\",\"rate\"]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"tr\",[]],[\"dynamic-attr\",\"id\",[\"concat\",[\"movie-actor-list-\",[\"arg\",[\"movie\",\"id\"]]]]],[\"dynamic-attr\",\"style\",[\"helper\",[\"if\"],[[\"get\",[\"isDetailHidden\"]],\"display:none;\"],null],null],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"td\",[]],[\"static-attr\",\"colspan\",\"5\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"actorName\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"arg\",[\"movie\",\"actors\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[\"movie\"],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"actor-data\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByActor\",[\"get\",[\"actor\",\"imdb_id\"]],[\"get\",[\"actor\",\"name\"]]]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"zoom \",[\"helper\",[\"if\"],[[\"helper\",[\"gte\"],[[\"helper\",[\"strContains\"],[[\"get\",[\"actor\",\"name\"]],[\"get\",[\"search_actor_name\"]]],null],0],null],\"highlighted\"],null]]]],[\"dynamic-attr\",\"src\",[\"concat\",[[\"unknown\",[\"actor\",\"photo\"]]]]],[\"dynamic-attr\",\"alt\",[\"concat\",[[\"unknown\",[\"actor\",\"name\"]]]]],[\"dynamic-attr\",\"title\",[\"concat\",[[\"unknown\",[\"actor\",\"name\"]]]]],[\"dynamic-attr\",\"onMouseOver\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectedActor\",[\"get\",[\"actor\",\"name\"]]],null],null],[\"dynamic-attr\",\"onmouseOut\",[\"helper\",[\"action\"],[[\"get\",[null]],\"unselectedActor\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"actor\",\"index\"]},{\"statements\":[[\"text\",\"        \"],[\"append\",[\"arg\",[\"movie\",\"title\"]],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/components/movie-data/template.hbs" } });
});
define('frontend/components/page-numbers', ['exports', 'ember', 'ember-cli-pagination/util', 'ember-cli-pagination/lib/page-items', 'ember-cli-pagination/validate'], function (exports, _ember, _emberCliPaginationUtil, _emberCliPaginationLibPageItems, _emberCliPaginationValidate) {
  exports['default'] = _ember['default'].Component.extend({
    currentPageBinding: "content.page",
    totalPagesBinding: "content.totalPages",

    hasPages: _ember['default'].computed.gt('totalPages', 1),

    watchInvalidPage: _ember['default'].observer("content", function () {
      var _this = this;

      var c = this.get('content');
      if (c && c.on) {
        c.on('invalidPage', function (e) {
          _this.sendAction('invalidPageAction', e);
        });
      }
    }),

    truncatePages: true,
    numPagesToShow: 10,

    validate: function validate() {
      if (_emberCliPaginationUtil['default'].isBlank(this.get('currentPage'))) {
        _emberCliPaginationValidate['default'].internalError("no currentPage for page-numbers");
      }
      if (_emberCliPaginationUtil['default'].isBlank(this.get('totalPages'))) {
        _emberCliPaginationValidate['default'].internalError('no totalPages for page-numbers');
      }
    },

    pageItemsObj: _ember['default'].computed(function () {
      return _emberCliPaginationLibPageItems['default'].create({
        parent: this,
        currentPageBinding: "parent.currentPage",
        totalPagesBinding: "parent.totalPages",
        truncatePagesBinding: "parent.truncatePages",
        numPagesToShowBinding: "parent.numPagesToShow",
        showFLBinding: "parent.showFL"
      });
    }),

    //pageItemsBinding: "pageItemsObj.pageItems",

    pageItems: _ember['default'].computed("pageItemsObj.pageItems", "pageItemsObj", function () {
      this.validate();
      return this.get("pageItemsObj.pageItems");
    }),

    canStepForward: _ember['default'].computed("currentPage", "totalPages", function () {
      var page = Number(this.get("currentPage"));
      var totalPages = Number(this.get("totalPages"));
      return page < totalPages;
    }),

    canStepBackward: _ember['default'].computed("currentPage", function () {
      var page = Number(this.get("currentPage"));
      return page > 1;
    }),

    actions: {
      pageClicked: function pageClicked(number) {
        _emberCliPaginationUtil['default'].log("PageNumbers#pageClicked number " + number);
        this.set("currentPage", number);
        this.sendAction('action', number);
      },
      incrementPage: function incrementPage(num) {
        var currentPage = Number(this.get("currentPage")),
            totalPages = Number(this.get("totalPages"));

        if (currentPage === totalPages && num === 1) {
          return false;
        }
        if (currentPage <= 1 && num === -1) {
          return false;
        }
        this.incrementProperty('currentPage', num);

        var newPage = this.get('currentPage');
        this.sendAction('action', newPage);
      }
    }
  });
});
define('frontend/components/search-box/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: ''
  });
});
define("frontend/components/search-box/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "D0hedXht", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group\"],[\"static-attr\",\"id\",\"adv-search\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\",\"class\"],[[\"get\",[\"text\"]],\"Search for movies\",\"form-control\"]]],false],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group-btn\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"btn-group\"],[\"static-attr\",\"role\",\"group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"dropdown dropdown-lg\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"bs-dropdown\"],null,[[\"tagName\",\"direction\",\"closeOnMenuClick\"],[\"div\",\"left\",false]],2],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"route-action\"],[\"simpleSearchMovies\",[\"get\",[\"text\"]]],null]]],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-search\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\\n\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                    \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-horizontal\"],[\"static-attr\",\"role\",\"form\"],[\"flush-element\"],[\"text\",\"\\n                      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n                        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"contain\"],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"class\",\"keyUp\"],[[\"get\",[\"title\"]],\"form-control\",[\"helper\",[\"route-action\"],[\"advancedSearchMovies\",[\"get\",[\"title\"]],[\"get\",[\"director\"]],[\"get\",[\"actor_name\"]],[\"get\",[\"min_rate\"]],[\"get\",[\"max_rate\"]],[\"get\",[\"year\"]]],null]]]],false],[\"text\",\"\\n                      \"],[\"close-element\"],[\"text\",\"\\n                      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n                        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"contain\"],[\"flush-element\"],[\"text\",\"Director\"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"class\",\"keyUp\"],[[\"get\",[\"director\"]],\"form-control\",[\"helper\",[\"route-action\"],[\"advancedSearchMovies\",[\"get\",[\"title\"]],[\"get\",[\"director\"]],[\"get\",[\"actor_name\"]],[\"get\",[\"min_rate\"]],[\"get\",[\"max_rate\"]],[\"get\",[\"year\"]]],null]]]],false],[\"text\",\"\\n                      \"],[\"close-element\"],[\"text\",\"\\n                      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n                        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"contain\"],[\"flush-element\"],[\"text\",\"Actor\"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"class\",\"keyUp\"],[[\"get\",[\"actor_name\"]],\"form-control\",[\"helper\",[\"route-action\"],[\"advancedSearchMovies\",[\"get\",[\"title\"]],[\"get\",[\"director\"]],[\"get\",[\"actor_name\"]],[\"get\",[\"min_rate\"]],[\"get\",[\"max_rate\"]],[\"get\",[\"year\"]]],null]]]],false],[\"text\",\"\\n                      \"],[\"close-element\"],[\"text\",\"\\n                      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n                          \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"contain\"],[\"flush-element\"],[\"text\",\"Year\"],[\"close-element\"],[\"text\",\"\\n                          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"class\",\"type\",\"min\",\"step\",\"change\"],[[\"get\",[\"year\"]],\"form-control\",\"number\",\"1900\",\"1\",[\"helper\",[\"route-action\"],[\"advancedSearchMovies\",[\"get\",[\"title\"]],[\"get\",[\"director\"]],[\"get\",[\"actor_name\"]],[\"get\",[\"min_rate\"]],[\"get\",[\"max_rate\"]],[\"get\",[\"year\"]]],null]]]],false],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n                          \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"contain\"],[\"flush-element\"],[\"text\",\"Rate min\"],[\"close-element\"],[\"text\",\"\\n                          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"class\",\"type\",\"min\",\"max\",\"step\",\"keyUp\"],[[\"get\",[\"min_rate\"]],\"form-control\",\"number\",\"0.0\",\"10.0\",\"0.1\",[\"helper\",[\"route-action\"],[\"advancedSearchMovies\",[\"get\",[\"title\"]],[\"get\",[\"director\"]],[\"get\",[\"actor_name\"]],[\"get\",[\"min_rate\"]],[\"get\",[\"max_rate\"]],[\"get\",[\"year\"]]],null]]]],false],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4 nopadding\"],[\"flush-element\"],[\"text\",\"\\n                          \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"contain\"],[\"flush-element\"],[\"text\",\"Rate max\"],[\"close-element\"],[\"text\",\"\\n                          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"class\",\"type\",\"min\",\"max\",\"step\",\"keyUp\"],[[\"get\",[\"max_rate\"]],\"form-control\",\"number\",\"0.0\",\"10.0\",\"0.1\",[\"helper\",[\"route-action\"],[\"advancedSearchMovies\",[\"get\",[\"title\"]],[\"get\",[\"director\"]],[\"get\",[\"actor_name\"]],[\"get\",[\"min_rate\"]],[\"get\",[\"max_rate\"]],[\"get\",[\"year\"]]],null]]]],false],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n                      \"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default dropdown-toggle\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"caret\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"block\",[\"bs-dropdown-toggle\"],null,null,1],[\"text\",\"\\n\\n\"],[\"block\",[\"bs-dropdown-menu\"],null,null,0]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/components/search-box/template.hbs" } });
});
define('frontend/components/show-errors/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define("frontend/components/show-errors/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "eE6SPWqe", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"errors\"]]],null,1]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"error\",\"attribute\"]],false],[\"text\",\": \"],[\"append\",[\"unknown\",[\"error\",\"message\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"error\"]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"error-panel\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert alert-danger\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"errors\"]]],null,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/components/show-errors/template.hbs" } });
});
define('frontend/components/suggest-movie/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define("frontend/components/suggest-movie/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "QKHXY3xC", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Suggested movies\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"helper\",[\"-each-in\"],[[\"get\",[\"movieData\"]]],null],[\"get\",[\"in\"]],[\"get\",[\"newMovie\",\"getSuggestions\"]]],null,0],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"id\",\"suggested-movies\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"movies\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/components/suggest-movie/template.hbs" } });
});
define('frontend/components/x-file-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    uploadedFile: false,
    uploadingFile: false,

    addChangeListenerToElement: _ember['default'].on('didInsertElement', function () {
      var _this = this;

      var input = this.$("input")[0];

      self = this;
      input.onchange = function (event) {
        self.set('uploadingFile', true);
        var file = event.target.files[0];
        var reader = new FileReader();
        var fileName = file.name;

        reader.onload = function (event) {
          _this.sendAction('handleFileAsDataURL', self, fileName, event.target.result);
        };

        reader.readAsDataURL(file);
      };
    }),

    handleFileAsDataURL: function handleFileAsDataURL(component, file_name, file_content) {
      $.ajax({
        type: "POST",
        url: "http://imdb-backend.herokuapp.com/movies/batch_create",
        dataType: 'json',
        data: { data: file_content },
        success: function success(data) {
          component.set('uploaded_movies', data['uploaded_movies']);
          component.set('imported_movies', data['imported_movies']);
          component.set('error_movies', data['error_movies']);

          component.set('uploadingFile', false);
          component.set('uploadedFile', true);
        }
      });
    }

  });
});
define("frontend/components/x-file-input/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "P5HkZJiD", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"uploadedFile\"]]],null,3,2]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container col-md-6\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"NewMovie\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"fieldset\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"legend\",[]],[\"flush-element\"],[\"text\",\"Upload CSV\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"CSV File\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"type\"],[[\"get\",[\"file\"]],\"file\"]]],false],[\"text\",\"\\n            \"],[\"open-element\",\"small\",[]],[\"static-attr\",\"class\",\"form-text text-muted\"],[\"flush-element\"],[\"text\",\"CSV Format: Title,Director name,Year,Rate,Actor1;Actor2;Actor3;...;ActorX\\n.\"],[\"close-element\"],[\"text\",\" \\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"loading\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Work in progress, please wait...\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/spinner.gif\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"uploadingFile\"]]],null,1,0]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container col-md-6 uploaded-csv-summary\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"suggestions-title\"],[\"flush-element\"],[\"text\",\"Import summary\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Uploaded movies\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"uploaded_movies\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Imported movies\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"imported_movies\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Failed movies\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"error_movies\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/components/x-file-input/template.hbs" } });
});
define('frontend/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session')
  });
});
define('frontend/controllers/login', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Controller.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
    authenticator: 'authenticator:custom',
    errors: []
  });
});
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
define('frontend/controllers/upload-csv', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    errors: [],
    uploading: false,
    completed: 0,
    type: 'file',
    attributeBindings: ['type', 'value'],

    actions: {
      addChangeListenerToElement: _ember['default'].on('didInsertElement', function () {
        var _this = this;

        var input = this.$()[0];
        console.log("A1");

        input.onchange = function (event) {
          var file = event.target.files[0];
          var reader = new FileReader();
          var fileName = file.name;
          console.log("A2");

          reader.onload = function (event) {
            console.log("A3");
            _this.sendAction('handleFileAsDataURL', fileName, event.target.result);
          };

          reader.readAsDataURL(file);
        };
      })
    }
  });
});
define('frontend/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/app-version', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _frontendConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('frontend/helpers/bs-contains', ['exports', 'ember-bootstrap/helpers/bs-contains'], function (exports, _emberBootstrapHelpersBsContains) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsContains['default'];
    }
  });
  Object.defineProperty(exports, 'bsContains', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsContains.bsContains;
    }
  });
});
define('frontend/helpers/bs-eq', ['exports', 'ember-bootstrap/helpers/bs-eq'], function (exports, _emberBootstrapHelpersBsEq) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsEq['default'];
    }
  });
  Object.defineProperty(exports, 'eq', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsEq.eq;
    }
  });
});
define('frontend/helpers/bs-not', ['exports', 'ember-bootstrap/helpers/bs-not'], function (exports, _emberBootstrapHelpersBsNot) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsNot['default'];
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsNot.not;
    }
  });
});
define('frontend/helpers/bs-read-path', ['exports', 'ember-bootstrap/helpers/bs-read-path'], function (exports, _emberBootstrapHelpersBsReadPath) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsReadPath['default'];
    }
  });
  Object.defineProperty(exports, 'readPath', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsReadPath.readPath;
    }
  });
});
define('frontend/helpers/current-username', ['exports', 'ember'], function (exports, _ember) {
  exports.currentUsername = currentUsername;

  function currentUsername() {
    return Frontend.get('userName');
  }

  exports['default'] = _ember['default'].Helper.helper(currentUsername);
});
define('frontend/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/exists-in', ['exports', 'ember-models-table/helpers/exists-in'], function (exports, _emberModelsTableHelpersExistsIn) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModelsTableHelpersExistsIn['default'];
    }
  });
  Object.defineProperty(exports, 'existsIn', {
    enumerable: true,
    get: function get() {
      return _emberModelsTableHelpersExistsIn.existsIn;
    }
  });
});
define('frontend/helpers/file-dropzone', ['exports', 'ember-file-upload/helpers/file-dropzone'], function (exports, _emberFileUploadHelpersFileDropzone) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadHelpersFileDropzone['default'];
    }
  });
});
define('frontend/helpers/file-queue', ['exports', 'ember-file-upload/helpers/file-queue'], function (exports, _emberFileUploadHelpersFileQueue) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadHelpersFileQueue['default'];
    }
  });
});
define('frontend/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/is-equal', ['exports', 'ember-models-table/helpers/is-equal'], function (exports, _emberModelsTableHelpersIsEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModelsTableHelpersIsEqual['default'];
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function get() {
      return _emberModelsTableHelpersIsEqual.isEqual;
    }
  });
});
define('frontend/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('frontend/helpers/results-filtered', ['exports', 'ember'], function (exports, _ember) {
  exports.resultsFiltered = resultsFiltered;

  function resultsFiltered(params) {
    var all_data = params.join('');
    return all_data.length > 0;
  }

  exports['default'] = _ember['default'].Helper.helper(resultsFiltered);
});
define('frontend/helpers/route-action', ['exports', 'ember-route-action-helper/helpers/route-action'], function (exports, _emberRouteActionHelperHelpersRouteAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRouteActionHelperHelpersRouteAction['default'];
    }
  });
});
define('frontend/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('frontend/helpers/str-contains', ['exports', 'ember'], function (exports, _ember) {
  exports.strContains = strContains;

  function strContains(strs) {
    if (strs[0].length === 0 || strs[1].length === 0) {
      return -1;
    }
    return strs[0].toLowerCase().indexOf(strs[1].toLowerCase());
  }

  exports['default'] = _ember['default'].Helper.helper(strContains);
});
define('frontend/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('frontend/initializers/allow-link-action', ['exports', 'ember-link-action/initializers/allow-link-action'], function (exports, _emberLinkActionInitializersAllowLinkAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLinkActionInitializersAllowLinkAction['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLinkActionInitializersAllowLinkAction.initialize;
    }
  });
});
define('frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'frontend/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _frontendConfigEnvironment) {
  var _config$APP = _frontendConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('frontend/initializers/bootstrap-linkto', ['exports', 'ember-bootstrap/initializers/bootstrap-linkto'], function (exports, _emberBootstrapInitializersBootstrapLinkto) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapInitializersBootstrapLinkto['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapInitializersBootstrapLinkto.initialize;
    }
  });
});
define('frontend/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('frontend/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('frontend/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('frontend/initializers/ember-simple-auth', ['exports', 'ember', 'frontend/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _frontendConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _frontendConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _frontendConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('frontend/initializers/export-application-global', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_frontendConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _frontendConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_frontendConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('frontend/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('frontend/initializers/load-bootstrap-config', ['exports', 'frontend/config/environment', 'ember-bootstrap/config'], function (exports, _frontendConfigEnvironment, _emberBootstrapConfig) {
  exports.initialize = initialize;

  function initialize() /* container, application */{
    _emberBootstrapConfig['default'].load(_frontendConfigEnvironment['default']['ember-bootstrap'] || {});
  }

  exports['default'] = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };
});
define('frontend/initializers/modals-container', ['exports', 'ember-bootstrap/initializers/modals-container'], function (exports, _emberBootstrapInitializersModalsContainer) {
  exports['default'] = _emberBootstrapInitializersModalsContainer['default'];
});
define('frontend/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('frontend/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('frontend/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("frontend/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('frontend/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
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
define('frontend/mixins/link-action', ['exports', 'ember-link-action/mixins/link-action'], function (exports, _emberLinkActionMixinsLinkAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLinkActionMixinsLinkAction['default'];
    }
  });
});
define('frontend/models/actor', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    photo: _emberData['default'].attr('string')
  });
});
define('frontend/models/director', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string')
  });
});
define('frontend/models/movie', ['exports', 'ember-data', 'ember-api-actions'], function (exports, _emberData, _emberApiActions) {
  exports['default'] = _emberData['default'].Model.extend({
    poster: _emberData['default'].attr('string'),
    title: _emberData['default'].attr('string'),
    year: _emberData['default'].attr('number'),
    rate: _emberData['default'].attr('string'),
    imdb_id: _emberData['default'].attr('string'),
    director: _emberData['default'].attr(),
    actors: _emberData['default'].attr(),
    getSuggestions: (0, _emberApiActions.collectionAction)({
      path: 'suggestions',
      type: 'get',
      urlType: 'findRecord'
    }),
    getMovie: (0, _emberApiActions.collectionAction)({
      path: 'get_movie',
      type: 'get',
      urlType: 'findRecord'
    })
  });
});
define('frontend/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    username: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string'),
    password_confirmation: _emberData['default'].attr('string')
  });
});
define('frontend/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
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
define('frontend/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  var _slice = Array.prototype.slice;
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),

    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      },
      toRoute: function toRoute() {
        var _transitionTo;

        (_transitionTo = this.transitionTo).call.apply(_transitionTo, [this].concat(_slice.call(arguments)));
        return true;
      },
      handleFileAsDataURL: function handleFileAsDataURL(file_name, file_content) {
        console.log("Handle");

        $.ajax({
          type: "POST",
          url: "http://imdb-backend.herokuapp.com/movies/batch_create",
          data: { data: file_content }
        });

        Frontend.set('isFileUploaded', true);
      }
    }
  });
});
define('frontend/routes/index', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),

    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
        this.transitionTo('/');
      }
    }
  });
});
define('frontend/routes/login', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {
    session: service('session'),
    model: function model(params) {
      return this.store.createRecord('user');
    },

    actions: {
      registerUser: function registerUser(model) {
        var _this = this;

        var user = this.store.createRecord('user', {
          username: model.get('username'),
          password: model.get('password'),
          password_confirmation: model.get('password_confirmation')
        });

        self = this;
        user.save().then(function (obj) {
          self.get('session').authenticate('authenticator:custom', { identification: obj.get('username'), password: obj.get('password') });
          self.transitionTo('movies');
        })['catch'](function (adapterError) {
          _this.controller.set('errors', user.get('errors').toArray());
        });
      }
    },

    setError: function setError() {
      this.set('error', true);
    },

    unsetError: function unsetError() {
      this.set('error', false);
    }
  });
});
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
define('frontend/routes/new-movie', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: service('session'),

    model: function model(params) {
      if (this.get('importedModel')) {
        var importedModel = this.get('importedModel');
        this.set('importedModel', null);
        return importedModel;
      } else {
        return this.store.createRecord('movie');
      }
    },

    actions: {
      createMovie: function createMovie(model) {
        var movie = this.store.createRecord('movie', {
          title: model.get('title'),
          director: model.get('director'),
          year: model.get('year'),
          rate: model.get('rate'),
          poster: model.get('poster'),
          actors: model.get('actors'),
          imdb_id: model.get('imdb_id')
        });

        self = this;
        movie.save().then(function (obj) {
          self.controller.set('suggestedMovies', null);
          self.transitionTo('movies');
        })['catch'](function (adapterError) {
          console.log(adapterError);
          self.controller.set('errors', movie.get('errors').toArray());
        });
      },
      guessMovie: function guessMovie(title) {
        if (title.length < 3) {
          this.controller.set('suggestedMovies', null);
        } else {
          var movie = this.store.createRecord('movie', { title: title });

          self = this;
          movie.getSuggestions({ title: title }).then(function (obj) {
            self.controller.set('suggestedMovies', obj);
          });
        }
      },
      importMovie: function importMovie(imdb_id) {
        this.controller.set('isLoadingImport', true);
        var movie = this.store.createRecord('movie', { imdb_id: imdb_id });
        self = this;
        movie.getMovie({ imdb: imdb_id }).then(function (obj) {
          var actors = obj.data.attributes.actors.map(function (x) {
            return x.name;
          }).join(',');
          var director = obj.data.attributes.director.name;
          self.set('importedModel', self.store.createRecord('movie', {
            title: obj.data.attributes.title,
            year: obj.data.attributes.year,
            director: director,
            actors: actors,
            imdb_id: obj.data.attributes['imdb-id'],
            poster: obj.data.attributes.poster,
            rate: obj.data.attributes.rate
          }));
          self.controller.set('isLoadingImport', false);
          self.refresh();
        });
      }
    }
  });
});
define('frontend/routes/upload-csv', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: service('session'),

    model: function model(params) {
      return this.store.createRecord('movie');
    },

    actions: {
      addChangeListenerToElement: _ember['default'].on('didInsertElement', function () {
        var _this = this;

        var input = this.$()[0];
        console.log("A1");

        input.onchange = function (event) {
          var file = event.target.files[0];
          var reader = new FileReader();
          var fileName = file.name;
          console.log("A2");

          reader.onload = function (event) {
            console.log("A3");
            _this.sendAction('handleFileAsDataURL', fileName, event.target.result);
          };

          reader.readAsDataURL(file);
        };
      })
    }

  });
});
define('frontend/serializers/movie', ['exports', 'ember-data'], function (exports, _emberData) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = _emberData['default'].JSONAPISerializer.extend({
    normalizeResponse: function normalizeResponse(store, primaryModelClass, payload, id, requestType) {
      var result = this._super.apply(this, arguments);

      result.meta = result.meta || {};
      if (payload.links) {
        result.meta.pagination = this.createPageMeta(payload.links);
      }

      return result;
    },

    createPageMeta: function createPageMeta(data) {
      var meta = {};

      Object.keys(data).forEach(function (type) {
        var link = data[type];
        meta[type] = {};
        var a = document.createElement('a');
        a.href = link;

        a.search.slice(1).split('&').forEach(function (pairs) {
          var _pairs$split = pairs.split('=');

          var _pairs$split2 = _slicedToArray(_pairs$split, 2);

          var param = _pairs$split2[0];
          var value = _pairs$split2[1];

          if (param == 'page%5Bnumber%5D') {
            meta[type].number = parseInt(value);
          }
          if (param == 'page%5Blimit%5D') {
            meta[type].limit = parseInt(value);
          }
        });
        a = null;
      });

      return meta;
    },

    attrs: {
      actors: { embedded: 'always' }
    }
  });
});
define('frontend/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('frontend/services/file-queue', ['exports', 'ember-file-upload/services/file-queue'], function (exports, _emberFileUploadServicesFileQueue) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFileUploadServicesFileQueue['default'];
    }
  });
});
define('frontend/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('frontend/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("frontend/templates/_menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7DrJyAaw", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"static-attr\",\"role\",\"navigation\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"comment\",\" Brand and toggle get grouped for better mobile display \"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#bs-example-navbar-collapse-1\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\" \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"navbar-brand\"],[\"static-attr\",\"href\",\"http://intuo-frontend.herokuapp.com\"],[\"flush-element\"],[\"text\",\"Adrian - INTUO\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"bs-example-navbar-collapse-1\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"movies\"],null,8],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"bs-dropdown\"],null,[[\"tagName\"],[\"li\"]],7],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"bs-dropdown\"],null,[[\"tagName\"],[\"li\"]],2],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"invalidateSession\"]],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-off\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Logout\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-user\"],[\"flush-element\"],[\"close-element\"],[\"append\",[\"unknown\",[\"currentUsername\"]],false],[\"text\",\" \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"caret\"],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"block\",[\"bs-dropdown-toggle\"],null,null,1],[\"text\",\"\\n\"],[\"block\",[\"bs-dropdown-menu\"],null,null,0]],\"locals\":[]},{\"statements\":[[\"text\",\"                    Upload CSV\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                    New movie\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"new-movie\"],null,4],[\"text\",\"                \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"upload-csv\"],null,3],[\"text\",\"                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-wrench\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Actions \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"caret\"],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"block\",[\"bs-dropdown-toggle\"],null,null,6],[\"text\",\"\\n\"],[\"block\",[\"bs-dropdown-menu\"],null,null,5]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-home\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Movies list\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/_menu.hbs" } });
});
define("frontend/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mQeTzS3B", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"static-attr\",\"id\",\"main-container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1,0],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"id\",\"title\"],[\"flush-element\"],[\"text\",\"Film Collection\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"partial\",\"menu\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/application.hbs" } });
});
define("frontend/templates/components/bs-accordion-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7kW/V/+X", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"role\",\"tab\"],[\"dynamic-attr\",\"class\",[\"concat\",[\"panel-heading \",[\"helper\",[\"if\"],[[\"get\",[\"collapsed\"]],\"collapsed\",\"expanded\"],null]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"toggleActive\"]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"panel-title\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"unknown\",[\"title\"]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"bs-collapse\"],null,[[\"collapsed\",\"class\"],[[\"get\",[\"collapsed\"]],\"panel-collapse\"]],0]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"yield\",\"default\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-accordion-item.hbs" } });
});
define("frontend/templates/components/bs-alert", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EqtaSO2Y", "block": "{\"statements\":[[\"block\",[\"unless\"],[[\"get\",[\"hidden\"]]],null,1]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"close\"],[\"static-attr\",\"aria-label\",\"Close\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"dismiss\"]],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"×\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"dismissible\"]]],null,0],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-alert.hbs" } });
});
define("frontend/templates/components/bs-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lT9FTMbv", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"icon\"]]],null,0],[\"append\",[\"unknown\",[\"text\"]],false],[\"yield\",\"default\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"icon\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-button.hbs" } });
});
define("frontend/templates/components/bs-form-element", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "xnTaAsUP", "block": "{\"statements\":[[\"partial\",[\"get\",[\"formElementTemplate\"]]]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/bs-form-element.hbs" } });
});
define("frontend/templates/components/bs-form-group", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vhKlqH65", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"hasFeedback\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"form-control-feedback \",[\"unknown\",[\"iconName\"]]]]],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-form-group.hbs" } });
});
define("frontend/templates/components/bs-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Ms+KvmT4", "block": "{\"statements\":[[\"yield\",\"default\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-form.hbs" } });
});
define("frontend/templates/components/bs-modal-dialog", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "1ZeUQY6I", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"modal-dialog \",[\"unknown\",[\"sizeClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-content\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"header\"]]],null,4],[\"block\",[\"if\"],[[\"get\",[\"body\"]]],null,3,1],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"footer\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"            \"],[\"append\",[\"unknown\",[\"bs-modal-footer\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"bs-modal-body\"],null,null,2]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"append\",[\"helper\",[\"bs-modal-header\"],null,[[\"title\",\"closeButton\"],[[\"get\",[\"title\"]],[\"get\",[\"closeButton\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-modal-dialog.hbs" } });
});
define("frontend/templates/components/bs-modal-footer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DYVdKteA", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,6,5]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"append\",[\"unknown\",[\"closeTitle\"]],false]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"bs-button\"],null,[[\"type\",\"action\"],[\"primary\",\"close\"]],0],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"append\",[\"unknown\",[\"submitTitle\"]],false]],\"locals\":[]},{\"statements\":[[\"append\",[\"unknown\",[\"closeTitle\"]],false]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"bs-button\"],null,[[\"type\",\"action\"],[\"default\",\"close\"]],3],[\"text\",\"\\n        \"],[\"block\",[\"bs-button\"],null,[[\"type\",\"buttonType\",\"disabled\"],[\"primary\",\"submit\",[\"get\",[\"submitDisabled\"]]]],2],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasSubmitButton\"]]],null,4,1]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"yield\",\"default\",[[\"get\",[null]]]],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-modal-footer.hbs" } });
});
define("frontend/templates/components/bs-modal-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DYY8Gibq", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"closeButton\"]]],null,2],[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,1,0]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"modal-title\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"title\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"yield\",\"default\",[[\"get\",[null]]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"close\"],[\"static-attr\",\"aria-label\",\"Close\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"close\"]],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"×\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-modal-header.hbs" } });
});
define("frontend/templates/components/bs-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FCKvAV2D", "block": "{\"statements\":[[\"block\",[\"ember-wormhole\"],null,[[\"to\",\"renderInPlace\"],[\"ember-bootstrap-modal-container\",[\"get\",[\"_renderInPlace\"]]]],2]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"modal-backdrop \",[\"helper\",[\"if\"],[[\"get\",[\"fade\"]],\"fade\"],null],\" \",[\"helper\",[\"if\"],[[\"get\",[\"in\"]],\"in\"],null]]]],[\"dynamic-attr\",\"id\",[\"concat\",[[\"unknown\",[\"backdropId\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"yield\",\"default\",[[\"get\",[null]]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"bs-modal-dialog\"],null,[[\"close\",\"class\",\"fade\",\"in\",\"id\",\"title\",\"closeButton\",\"keyboard\",\"header\",\"body\",\"footer\",\"size\",\"backdropClose\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"close\"],null],[\"get\",[\"class\"]],[\"get\",[\"fade\"]],[\"get\",[\"in\"]],[\"get\",[\"modalId\"]],[\"get\",[\"title\"]],[\"get\",[\"closeButton\"]],[\"get\",[\"keyboard\"]],[\"get\",[\"header\"]],[\"get\",[\"body\"]],[\"get\",[\"footer\"]],[\"get\",[\"size\"]],[\"get\",[\"backdropClose\"]]]],1],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"showBackdrop\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-modal.hbs" } });
});
define("frontend/templates/components/bs-progress-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FIVV+uk/", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"showLabel\"]]],null,5,2]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"percentRounded\"]],false],[\"text\",\"%\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"yield\",\"default\",[[\"get\",[\"percentRounded\"]]]],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,1,0],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"append\",[\"unknown\",[\"percentRounded\"]],false],[\"text\",\"%\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"yield\",\"default\",[[\"get\",[\"percentRounded\"]]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,4,3]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-progress-bar.hbs" } });
});
define("frontend/templates/components/bs-progress", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "1gpNUDRE", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-progress.hbs" } });
});
define("frontend/templates/components/bs-select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "L9XQ1Thl", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"prompt\"]]],null,1],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"content\"]]],[[\"key\"],[\"@identity\"]],0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"concat\",[[\"helper\",[\"bs-read-path\"],[[\"get\",[\"item\"]],[\"get\",[\"optionValuePath\"]]],null]]]],[\"dynamic-attr\",\"selected\",[\"helper\",[\"bs-eq\"],[[\"get\",[\"item\"]],[\"get\",[\"value\"]]],null],null],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"bs-read-path\"],[[\"get\",[\"item\"]],[\"get\",[\"optionLabelPath\"]]],null],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"item\"]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"selected\",[\"helper\",[\"bs-not\"],[[\"get\",[\"value\"]]],null],null],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"unknown\",[\"prompt\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/bs-select.hbs" } });
});
define("frontend/templates/components/form-element/errors", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2amOygms", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"showValidationMessages\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"help-block\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"validationMessages\",\"firstObject\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/form-element/errors.hbs" } });
});
define("frontend/templates/components/form-element/feedback-icon", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "KA64HG2x", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasFeedback\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"form-control-feedback \",[\"unknown\",[\"iconName\"]]]]],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/form-element/feedback-icon.hbs" } });
});
define("frontend/templates/components/form-element/horizontal/checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "XUstdJuE", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"horizontalInputGridClass\"]],\" \",[\"unknown\",[\"horizontalInputOffsetGridClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"checkbox\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"input\"],null,[[\"name\",\"type\",\"checked\",\"disabled\",\"required\"],[[\"get\",[\"name\"]],\"checkbox\",[\"get\",[\"value\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"label\"]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/horizontal/checkbox.hbs" } });
});
define("frontend/templates/components/form-element/horizontal/default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Fr96TTl3", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasLabel\"]]],null,5,2]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"            \"],[\"append\",[\"helper\",[\"bs-input\"],null,[[\"name\",\"type\",\"value\",\"placeholder\",\"autofocus\",\"disabled\",\"required\"],[[\"get\",[\"name\"]],[\"get\",[\"controlType\"]],[\"get\",[\"value\"]],[\"get\",[\"placeholder\"]],[\"get\",[\"autofocus\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"yield\",\"default\",[[\"get\",[\"value\"]],[\"get\",[\"formElementId\"]],[\"get\",[\"validation\"]]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"horizontalInputGridClass\"]],\" \",[\"unknown\",[\"horizontalInputOffsetGridClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,1,0],[\"text\",\"        \"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"append\",[\"helper\",[\"bs-input\"],null,[[\"id\",\"name\",\"type\",\"value\",\"placeholder\",\"autofocus\",\"disabled\",\"required\"],[[\"get\",[\"formElementId\"]],[\"get\",[\"name\"]],[\"get\",[\"controlType\"]],[\"get\",[\"value\"]],[\"get\",[\"placeholder\"]],[\"get\",[\"autofocus\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"yield\",\"default\",[[\"get\",[\"value\"]],[\"get\",[\"formElementId\"]],[\"get\",[\"validation\"]]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"control-label \",[\"unknown\",[\"horizontalLabelGridClass\"]],\" \",[\"helper\",[\"if\"],[[\"get\",[\"invisibleLabel\"]],\"sr-only\"],null]]]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"unknown\",[\"formElementId\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"label\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"horizontalInputGridClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,4,3],[\"text\",\"        \"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/horizontal/default.hbs" } });
});
define("frontend/templates/components/form-element/horizontal/select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2bq+85DN", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasLabel\"]]],null,1,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"horizontalInputGridClass\"]],\" \",[\"unknown\",[\"horizontalInputOffsetGridClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"bs-select\"],null,[[\"name\",\"content\",\"optionValuePath\",\"optionLabelPath\",\"value\"],[[\"get\",[\"name\"]],[\"get\",[\"choices\"]],[\"get\",[\"choiceValueProperty\"]],[\"get\",[\"choiceLabelProperty\"]],[\"get\",[\"value\"]]]]],false],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"control-label \",[\"unknown\",[\"horizontalLabelGridClass\"]],\" \",[\"helper\",[\"if\"],[[\"get\",[\"invisibleLabel\"]],\"sr-only\"],null]]]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"unknown\",[\"formElementId\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"label\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"horizontalInputGridClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"bs-select\"],null,[[\"id\",\"name\",\"content\",\"optionValuePath\",\"optionLabelPath\",\"value\",\"disabled\",\"required\"],[[\"get\",[\"formElementId\"]],[\"get\",[\"name\"]],[\"get\",[\"choices\"]],[\"get\",[\"choiceValueProperty\"]],[\"get\",[\"choiceLabelProperty\"]],[\"get\",[\"value\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/horizontal/select.hbs" } });
});
define("frontend/templates/components/form-element/horizontal/textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "k+AyuZDf", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasLabel\"]]],null,1,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"horizontalInputGridClass\"]],\" \",[\"unknown\",[\"horizontalInputOffsetGridClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"bs-textarea\"],null,[[\"name\",\"value\",\"placeholder\",\"autofocus\",\"cols\",\"rows\",\"disabled\",\"required\"],[[\"get\",[\"name\"]],[\"get\",[\"value\"]],[\"get\",[\"placeholder\"]],[\"get\",[\"autofocus\"]],[\"get\",[\"cols\"]],[\"get\",[\"rows\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"control-label \",[\"unknown\",[\"horizontalLabelGridClass\"]],\" \",[\"helper\",[\"if\"],[[\"get\",[\"invisibleLabel\"]],\"sr-only\"],null]]]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"unknown\",[\"formElementId\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"label\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"horizontalInputGridClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"bs-textarea\"],null,[[\"id\",\"name\",\"value\",\"placeholder\",\"autofocus\",\"cols\",\"rows\",\"disabled\",\"required\"],[[\"get\",[\"formElementId\"]],[\"get\",[\"name\"]],[\"get\",[\"value\"]],[\"get\",[\"placeholder\"]],[\"get\",[\"autofocus\"]],[\"get\",[\"cols\"]],[\"get\",[\"rows\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n        \"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/horizontal/textarea.hbs" } });
});
define("frontend/templates/components/form-element/inline/checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6O0WGxqs", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"checkbox\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"name\",\"type\",\"checked\",\"disabled\",\"required\"],[[\"get\",[\"name\"]],\"checkbox\",[\"get\",[\"value\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"label\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/form-element/inline/checkbox.hbs" } });
});
define("frontend/templates/components/form-element/inline/default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "x8YTZfDs", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasLabel\"]]],null,2],[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,1,0],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"bs-input\"],null,[[\"id\",\"name\",\"type\",\"value\",\"placeholder\",\"autofocus\",\"disabled\",\"required\"],[[\"get\",[\"formElementId\"]],[\"get\",[\"name\"]],[\"get\",[\"controlType\"]],[\"get\",[\"value\"]],[\"get\",[\"placeholder\"]],[\"get\",[\"autofocus\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"yield\",\"default\",[[\"get\",[\"value\"]],[\"get\",[\"formElementId\"]],[\"get\",[\"validation\"]]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"control-label \",[\"helper\",[\"if\"],[[\"get\",[\"invisibleLabel\"]],\"sr-only\"],null]]]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"unknown\",[\"formElementId\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"label\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/inline/default.hbs" } });
});
define("frontend/templates/components/form-element/inline/select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "l8mAH02C", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasLabel\"]]],null,0],[\"append\",[\"helper\",[\"bs-select\"],null,[[\"id\",\"name\",\"content\",\"optionValuePath\",\"optionLabelPath\",\"value\",\"disabled\",\"required\"],[[\"get\",[\"formElementId\"]],[\"get\",[\"name\"]],[\"get\",[\"choices\"]],[\"get\",[\"choiceValueProperty\"]],[\"get\",[\"choiceLabelProperty\"]],[\"get\",[\"value\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n\"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"control-label \",[\"helper\",[\"if\"],[[\"get\",[\"invisibleLabel\"]],\"sr-only\"],null]]]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"unknown\",[\"formElementId\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"label\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/inline/select.hbs" } });
});
define("frontend/templates/components/form-element/inline/textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "TmGlZZ72", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasLabel\"]]],null,0],[\"append\",[\"helper\",[\"bs-textarea\"],null,[[\"id\",\"name\",\"value\",\"placeholder\",\"autofocus\",\"cols\",\"rows\",\"disabled\",\"required\"],[[\"get\",[\"formElementId\"]],[\"get\",[\"name\"]],[\"get\",[\"value\"]],[\"get\",[\"placeholder\"]],[\"get\",[\"autofocus\"]],[\"get\",[\"cols\"]],[\"get\",[\"rows\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n\"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n\"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"control-label \",[\"helper\",[\"if\"],[[\"get\",[\"invisibleLabel\"]],\"sr-only\"],null]]]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"unknown\",[\"formElementId\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"label\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/inline/textarea.hbs" } });
});
define("frontend/templates/components/form-element/vertical/checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7z8WWzUz", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"checkbox\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"name\",\"type\",\"checked\",\"disabled\",\"required\"],[[\"get\",[\"name\"]],\"checkbox\",[\"get\",[\"value\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"label\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"partial\",\"components/form-element/errors\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/vertical/checkbox.hbs" } });
});
define("frontend/templates/components/form-element/vertical/default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Grbarywy", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasLabel\"]]],null,2],[\"block\",[\"if\"],[[\"has-block\",\"default\"]],null,1,0],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n\"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"bs-input\"],null,[[\"id\",\"name\",\"type\",\"value\",\"placeholder\",\"autofocus\",\"disabled\",\"required\"],[[\"get\",[\"formElementId\"]],[\"get\",[\"name\"]],[\"get\",[\"controlType\"]],[\"get\",[\"value\"]],[\"get\",[\"placeholder\"]],[\"get\",[\"autofocus\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"yield\",\"default\",[[\"get\",[\"value\"]],[\"get\",[\"formElementId\"]],[\"get\",[\"validation\"]]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"control-label \",[\"helper\",[\"if\"],[[\"get\",[\"invisibleLabel\"]],\"sr-only\"],null]]]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"unknown\",[\"formElementId\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"label\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/vertical/default.hbs" } });
});
define("frontend/templates/components/form-element/vertical/select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6RQcDfQN", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasLabel\"]]],null,0],[\"append\",[\"helper\",[\"bs-select\"],null,[[\"id\",\"name\",\"content\",\"optionValuePath\",\"optionLabelPath\",\"value\",\"disabled\",\"required\"],[[\"get\",[\"formElementId\"]],[\"get\",[\"name\"]],[\"get\",[\"choices\"]],[\"get\",[\"choiceValueProperty\"]],[\"get\",[\"choiceLabelProperty\"]],[\"get\",[\"value\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]]]]],false],[\"text\",\"\\n\"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n\"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"control-label \",[\"helper\",[\"if\"],[[\"get\",[\"invisibleLabel\"]],\"sr-only\"],null]]]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"unknown\",[\"formElementId\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"label\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/vertical/select.hbs" } });
});
define("frontend/templates/components/form-element/vertical/textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "PDUEaalv", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"hasLabel\"]]],null,0],[\"append\",[\"helper\",[\"bs-textarea\"],null,[[\"id\",\"value\",\"name\",\"placeholder\",\"autofocus\",\"disabled\",\"required\",\"cols\",\"rows\"],[[\"get\",[\"formElementId\"]],[\"get\",[\"value\"]],[\"get\",[\"name\"]],[\"get\",[\"placeholder\"]],[\"get\",[\"autofocus\"]],[\"get\",[\"disabled\"]],[\"get\",[\"required\"]],[\"get\",[\"cols\"]],[\"get\",[\"rows\"]]]]],false],[\"text\",\"\\n\"],[\"partial\",\"components/form-element/feedback-icon\"],[\"text\",\"\\n\"],[\"partial\",\"components/form-element/errors\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"control-label \",[\"helper\",[\"if\"],[[\"get\",[\"invisibleLabel\"]],\"sr-only\"],null]]]],[\"dynamic-attr\",\"for\",[\"concat\",[[\"unknown\",[\"formElementId\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"label\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/form-element/vertical/textarea.hbs" } });
});
define("frontend/templates/components/models-table/columns-dropdown", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Q3anVcv9", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"columnsDropdownWrapper\"]]]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"columnsDropdownButtonWrapper\"]]]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"buttonDefault\"]],\" dropdown-toggle\"]]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"aria-haspopup\",\"true\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"unknown\",[\"messages\",\"columns-title\"]],false],[\"text\",\" \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"icons\",\"caret\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"columnsDropdown\"]]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"showAllColumns\",[\"get\",[\"column\"]]],[[\"bubbles\"],[false]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"messages\",\"columns-showAll\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"hideAllColumns\",[\"get\",[\"column\"]]],[[\"bubbles\"],[false]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"messages\",\"columns-hideAll\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"restoreDefaultVisibility\",[\"get\",[\"column\"]]],[[\"bubbles\"],[false]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"messages\",\"columns-restoreDefaults\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"divider\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"processedColumns\"]]],null,1],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"toggleHidden\",[\"get\",[\"column\"]]],[[\"bubbles\"],[false]]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"column\",\"isVisible\"]],[\"get\",[\"icons\",\"column-visible\"]],[\"get\",[\"icons\",\"column-hidden\"]]],null]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"column\",\"title\"]],false],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"mayBeHidden\"]]],null,0]],\"locals\":[\"column\"]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/models-table/columns-dropdown.hbs" } });
});
define("frontend/templates/components/models-table/component-footer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "m2MQN0kU", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"tfooterWrapper\"]]]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"useNumericPagination\"]],[\"get\",[\"classes\",\"footerSummaryNumericPagination\"]],[\"get\",[\"classes\",\"footerSummaryDefaultPagination\"]]],null],\" \",[\"unknown\",[\"classes\",\"footerSummary\"]]]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"summary\"]],false],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"dynamic-attr\",\"class\",[\"concat\",[\"btn btn-link clearFilters \",[\"helper\",[\"unless\"],[[\"get\",[\"anyFilterUsed\"]],\"invisible\"],null]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"clearFilters\"]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"clearAllFiltersIcon\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"showPageSize\"]]],null,2],[\"block\",[\"if\"],[[\"get\",[\"useNumericPagination\"]]],null,1,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"paginationWrapper\"]],\" \",[\"unknown\",[\"classes\",\"paginationWrapperDefault\"]]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"partial\",[\"get\",[\"simplePaginationTemplate\"]]],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"paginationWrapper\"]],\" \",[\"unknown\",[\"classes\",\"paginationWrapperNumeric\"]]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"partial\",[\"get\",[\"numericPaginationTemplate\"]]],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"partial\",[\"get\",[\"pageSizeTemplate\"]]],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/models-table/component-footer.hbs" } });
});
define("frontend/templates/components/models-table/expand-row-cell", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "z9MjvXfR", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"helper\",[\"exists-in\"],[[\"get\",[\"_expandedRowIndexes\"]],[\"get\",[\"index\"]]],null]],null,1,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"dynamic-attr\",\"class\",[\"unknown\",[\"classes\",\"expandRow\"]],null],[\"modifier\",[\"action\"],[[\"get\",[null]],\"expandRow\",[\"get\",[\"index\"]]],[[\"bubbles\"],[false]]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"icons\",\"expand-row\"]]]]],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"dynamic-attr\",\"class\",[\"unknown\",[\"classes\",\"collapseRow\"]],null],[\"modifier\",[\"action\"],[[\"get\",[null]],\"collapseRow\",[\"get\",[\"index\"]]],[[\"bubbles\"],[false]]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"icons\",\"collapse-row\"]]]]],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/models-table/expand-row-cell.hbs" } });
});
define("frontend/templates/components/models-table/global-filter", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "PTxGxXmE", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"globalFilterWrapper\"]]]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-inline globalSearch\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"messages\",\"searchLabel\"]],false],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"class\",\"enter\",\"placeholder\"],[\"text\",[\"get\",[\"filterString\"]],[\"helper\",[\"concat\"],[[\"get\",[\"classes\",\"input\"]],\" filterString\"],null],\"\",[\"get\",[\"messages\",\"searchPlaceholder\"]]]]],false],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"globalFilterUsed\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"filterString\"]]],null],\"\"],null],null],[\"dynamic-attr\",\"class\",[\"concat\",[\"clearFilterIcon \",[\"unknown\",[\"classes\",\"clearFilterIcon\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/models-table/global-filter.hbs" } });
});
define("frontend/templates/components/models-table/header-row-filtering", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Vg9pQa0e", "block": "{\"statements\":[[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"processedColumns\"]]],null,10],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"               \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                  \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"column\",\"filterString\"]]],null],\"\"],null],null],[\"dynamic-attr\",\"class\",[\"concat\",[\"clearFilterIcon \",[\"unknown\",[\"classes\",\"clearFilterIcon\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"class\",\"enter\",\"placeholder\"],[\"text\",[\"get\",[\"column\",\"filterString\"]],[\"get\",[\"classes\",\"input\"]],\"\",[\"get\",[\"column\",\"filterPlaceholder\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                  \"],[\"append\",[\"helper\",[\"models-select\"],null,[[\"options\",\"cssPropertyName\",\"value\",\"class\"],[[\"get\",[\"column\",\"filterOptions\"]],[\"get\",[\"column\",\"cssPropertyName\"]],[\"get\",[\"column\",\"filterString\"]],[\"helper\",[\"concat\"],[[\"get\",[\"classes\",\"input\"]],\" changeFilterForColumn\"],null]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"column\",\"filterUsed\"]],\"has-feedback\"],null]]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"column\",\"filterWithSelect\"]]],null,3,2],[\"block\",[\"if\"],[[\"get\",[\"column\",\"filterUsed\"]]],null,1],[\"text\",\"              \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"useFilter\"]]],null,4,0]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"column\",\"componentForFilterCell\"]]],[[\"data\",\"column\",\"row\",\"table\"],[[\"get\",[\"data\"]],[\"get\",[\"column\"]],[\"get\",[\"record\"]],[\"get\",[null]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"componentForFilterCell\"]]],null,6,5]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"partial\",[\"get\",[\"column\",\"templateForFilterCell\"]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"th\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"theadCell\"]],\" \",[\"helper\",[\"unless\"],[[\"get\",[\"column\",\"useFilter\"]],[\"get\",[\"classes\",\"theadCellNoFiltering\"]]],null]]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"column\",\"templateForFilterCell\"]]],null,8,7],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"isVisible\"]]],null,9]],\"locals\":[\"column\"]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/models-table/header-row-filtering.hbs" } });
});
define("frontend/templates/components/models-table/header-row-sorting", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "E/lPhgtj", "block": "{\"statements\":[[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"processedColumns\"]]],null,11],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"              \"],[\"append\",[\"unknown\",[\"column\",\"title\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"column\",\"componentName\"]]],[[\"data\",\"column\",\"record\"],[[\"get\",[\"data\"]],[\"get\",[\"column\"]],[\"get\",[\"record\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"componentForSortCell\"]]],null,1,0]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"partial\",[\"get\",[\"column\",\"templateForSortCell\"]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"th\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"theadCell\"]],\" \",[\"unknown\",[\"classes\",\"theadCellNoSorting\"]]]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"column\",\"templateForSortCell\"]]],null,3,2],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"append\",[\"unknown\",[\"column\",\"title\"]],false],[\"text\",\"\\n              \"],[\"partial\",[\"get\",[\"headerSortingIconsTemplate\"]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"column\",\"componentForSortCell\"]]],[[\"data\",\"column\",\"row\",\"table\"],[[\"get\",[\"data\"]],[\"get\",[\"column\"]],[\"get\",[\"record\"]],[\"get\",[null]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"componentForSortCell\"]]],null,6,5]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"partial\",[\"get\",[\"column\",\"templateForSortCell\"]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"th\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"theadCell\"]]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"column\"]]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"column\",\"templateForSortCell\"]]],null,8,7],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"useSorting\"]]],null,9,4]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"isVisible\"]]],null,10]],\"locals\":[\"column\"]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/models-table/header-row-sorting.hbs" } });
});
define("frontend/templates/components/models-table/header-rows-grouped", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "1pbycZIz", "block": "{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"groupedHeaders\"]]],null,1]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"th\",[]],[\"dynamic-attr\",\"colspan\",[\"concat\",[[\"unknown\",[\"cell\",\"colspan\"]]]]],[\"dynamic-attr\",\"rowspan\",[\"concat\",[[\"unknown\",[\"cell\",\"rowspan\"]]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"cell\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"cell\"]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"row\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"row\"]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/models-table/header-rows-grouped.hbs" } });
});
define("frontend/templates/components/models-table/header-sorting-icons", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9Gv11pe8", "block": "{\"statements\":[[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"column\",\"sortAsc\"]],[\"get\",[\"icons\",\"sort-asc\"]]],null],\" \",[\"helper\",[\"if\"],[[\"get\",[\"column\",\"sortDesc\"]],[\"get\",[\"icons\",\"sort-desc\"]]],null]]]],[\"flush-element\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/models-table/header-sorting-icons.hbs" } });
});
define("frontend/templates/components/models-table/numeric-pagination", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lz1B5bRV", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"btn-toolbar pull-right\"],[\"static-attr\",\"role\",\"toolbar\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"btn-group\"],[\"static-attr\",\"role\",\"group\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"visiblePageNumbers\"]]],null,2],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"disabled\",\"disabled\"],[\"static-attr\",\"type\",\"button\"],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"buttonDefault\"]]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"gotoCustomPage\",[\"get\",[\"page\",\"label\"]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"page\",\"label\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"page\",\"isActive\"]],\"active\"],null],\" \",[\"unknown\",[\"classes\",\"buttonDefault\"]]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"gotoCustomPage\",[\"get\",[\"page\",\"label\"]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"page\",\"label\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"page\",\"isLink\"]]],null,1,0]],\"locals\":[\"page\"]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/models-table/numeric-pagination.hbs" } });
});
define("frontend/templates/components/models-table/page-size", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "SHORvHM6", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"pageSizeWrapper\"]]]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"classes\",\"pageSizeSelectWrapper\"]]]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"models-select\"],null,[[\"options\",\"value\",\"class\"],[[\"get\",[\"pageSizeValues\"]],[\"get\",[\"pageSize\"]],[\"helper\",[\"concat\"],[[\"get\",[\"classes\",\"input\"]],\" changePageSize\"],null]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/models-table/page-size.hbs" } });
});
define("frontend/templates/components/models-table/row", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "A3H7Qw8v", "block": "{\"statements\":[[\"open-element\",\"tr\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"helper\",[\"exists-in\"],[[\"get\",[\"_selectedItems\"]],[\"get\",[\"record\"]]],null],\"selected-row\"],null]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"clickOnRow\",[\"get\",[\"index\"]],[\"get\",[\"record\"]]],[[\"on\"],[\"click\"]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"processedColumns\"]]],null,11],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"exists-in\"],[[\"get\",[\"_expandedRowIndexes\"]],[\"get\",[\"index\"]]],null]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"tr\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"expand-row \",[\"helper\",[\"concat\"],[\"expand-\",[\"get\",[\"index\"]]],null],\" \",[\"helper\",[\"if\"],[[\"helper\",[\"exists-in\"],[[\"get\",[\"_selectedItems\"]],[\"get\",[\"record\"]]],null],\"selected-expand\"],null]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"clickOnRow\",[\"get\",[\"index\"]],[\"get\",[\"record\"]]],[[\"on\"],[\"click\"]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"td\",[]],[\"dynamic-attr\",\"colspan\",[\"concat\",[[\"unknown\",[\"visibleProcessedColumns\",\"length\"]]]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"partial\",[\"get\",[\"expandedRowTemplate\"]]],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"append\",[\"helper\",[\"get\"],[[\"get\",[\"record\"]],[\"get\",[\"column\",\"propertyName\"]]],null],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"column\",\"component\"]]],[[\"data\",\"record\",\"column\",\"table\"],[[\"get\",[\"data\"]],[\"get\",[\"record\"]],[\"get\",[\"column\"]],[\"get\",[null]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"component\"]]],null,2,1]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"partial\",[\"get\",[\"column\",\"template\"]]],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"template\"]]],null,4,3]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"append\",[\"unknown\",[\"record\",\"id\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"append\",[\"helper\",[\"get\"],[[\"get\",[\"record\"]],[\"get\",[\"column\",\"propertyName\"]]],null],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"propertyName\"]]],null,7,6]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[[\"get\",[\"column\",\"routeName\"]],[\"get\",[\"record\",\"id\"]]],null,8]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"td\",[]],[\"dynamic-attr\",\"class\",[\"unknown\",[\"column\",\"className\"]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"column\",\"routeName\"]]],null,9,5],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"column\",\"isVisible\"]]],null,10]],\"locals\":[\"column\"]}],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/components/models-table/row.hbs" } });
});
define("frontend/templates/components/models-table/simple-pagination", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lqbFaWOm", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"btn-toolbar pull-right\"],[\"static-attr\",\"role\",\"toolbar\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"btn-group\"],[\"static-attr\",\"role\",\"group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"gotoBackEnabled\"]],\"enabled\",\"disabled\"],null],\" btn btn-default\"]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"gotoFirst\"]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"icons\",\"nav-first\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"gotoBackEnabled\"]],\"enabled\",\"disabled\"],null],\" btn btn-default\"]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"gotoPrev\"]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"icons\",\"nav-prev\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"gotoForwardEnabled\"]],\"enabled\",\"disabled\"],null],\" btn btn-default\"]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"gotoNext\"]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"icons\",\"nav-next\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"gotoForwardEnabled\"]],\"enabled\",\"disabled\"],null],\" btn btn-default\"]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"gotoLast\"]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"icons\",\"nav-last\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/models-table/simple-pagination.hbs" } });
});
define("frontend/templates/components/models-table/table-footer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "KbZpeayI", "block": "{\"statements\":[],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/models-table/table-footer.hbs" } });
});
define("frontend/templates/components/page-numbers", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Notirilg", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"pagination-centered\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"pagination\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"canStepBackward\"]]],null,7,6],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"pageItems\"]]],null,5],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"canStepForward\"]]],null,1,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"arrow next disabled\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPage\",1]],[\"flush-element\"],[\"text\",\"»\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"arrow next enabled-arrow\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPage\",1]],[\"flush-element\"],[\"text\",\"»\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"page-number\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"pageClicked\",[\"get\",[\"item\",\"page\"]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"page\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"active page-number\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"a\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"page\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dots disabled\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"...\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"item\",\"dots\"]]],null,4],[\"block\",[\"if\"],[[\"get\",[\"item\",\"current\"]]],null,3,2]],\"locals\":[\"item\"]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"arrow prev disabled\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPage\",-1]],[\"flush-element\"],[\"text\",\"«\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"arrow prev enabled-arrow\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPage\",-1]],[\"flush-element\"],[\"text\",\"«\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/page-numbers.hbs" } });
});
define("frontend/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "iR4fkBnV", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/index.hbs" } });
});
define("frontend/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FjlA6dAo", "block": "{\"statements\":[[\"append\",[\"helper\",[\"login-form\"],null,[[\"newUser\",\"registerUser\",\"errors\"],[[\"get\",[\"model\"]],\"registerUser\",[\"get\",[\"errors\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/login.hbs" } });
});
define("frontend/templates/movies", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "L6+U6q8P", "block": "{\"statements\":[[\"partial\",\"movies-actions\"],[\"text\",\"\\n\\n\"],[\"partial\",\"movies-list\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":true}", "meta": { "moduleName": "frontend/templates/movies.hbs" } });
});
define("frontend/templates/movies_actions", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hRVN2Z2p", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"static-attr\",\"id\",\"search-box\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-7\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"gt\"],[[\"helper\",[\"resultsFiltered\"],[[\"get\",[\"search_q\"]],[\"get\",[\"search_title\"]],[\"get\",[\"search_director\"]],[\"get\",[\"search_actor_name\"]],[\"get\",[\"search_min_rate\"]],[\"get\",[\"search_max_rate\"]],[\"get\",[\"search_year\"]]],null],0],null]],null,8],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-5\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"block\",[\"search-box\"],null,[[\"movie\",\"searchMovies\",\"title\",\"director\",\"actor_name\",\"min_rate\",\"max_rate\",\"year\"],[[\"get\",[\"model\"]],\"searchMovies\",[\"get\",[\"search_title\"]],[\"get\",[\"search_director\"]],[\"get\",[\"search_actor_name\"]],[\"get\",[\"search_min_rate\"]],[\"get\",[\"search_max_rate\"]],[\"get\",[\"search_year\"]]]],0],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Min. Rate:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"search_max_rate\"]],false],[\"text\",\" \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByAllMaxRate\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"remove\"],null],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Year:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"search_year\"]],false],[\"text\",\" \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByAllYear\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"remove\"],null],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Min. Rate:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"search_min_rate\"]],false],[\"text\",\" \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByAllMinRate\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"remove\"],null],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Actor:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"search_actor_name\"]],false],[\"text\",\" \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByAllActor\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"remove\"],null],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Director:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"search_director\"]],false],[\"text\",\" \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByAllDirector\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"remove\"],null],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Titulo:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"search_title\"]],false],[\"text\",\" \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByAllTitle\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"remove\"],null],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Text:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"search_q\"]],false],[\"text\",\" \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"moviesByAllQ\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"remove\"],null],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel\"],[\"static-attr\",\"id\",\"search-criteria-panel\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-heading\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"panel-title\"],[\"flush-element\"],[\"text\",\"Selected search criteria\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"search_q\"]]],null,7],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"search_title\"]]],null,6],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"search_director\"]]],null,5],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"search_actor_name\"]]],null,4],[\"block\",[\"if\"],[[\"get\",[\"search_min_rate\"]]],null,3],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"search_year\"]]],null,2],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"search_max_rate\"]]],null,1],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/movies_actions.hbs" } });
});
define("frontend/templates/movies_list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rLP9OB40", "block": "{\"statements\":[[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-over\"],[\"static-attr\",\"id\",\"movie-list\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-md-1\"],[\"flush-element\"],[\"text\",\"Poster\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-md-6\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"order\",\"title\",\"desc\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"fa-angle-down\"],null],false],[\"close-element\"],[\"text\",\"\\n        Title\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"order\",\"title\",\"asc\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"fa-angle-up\"],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-md-3\"],[\"flush-element\"],[\"text\",\"Director\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-md-1\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"order\",\"year\",\"desc\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"fa-angle-down\"],null],false],[\"close-element\"],[\"text\",\"\\n        Year\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"order\",\"year\",\"asc\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"fa-angle-up\"],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-md-1\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"order\",\"rate\",\"desc\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"fa-angle-down\"],null],false],[\"close-element\"],[\"text\",\"\\n        Rate\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"order\",\"rate\",\"asc\"]],[\"flush-element\"],[\"append\",[\"helper\",[\"fa-icon\"],[\"fa-angle-up\"],null],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,5],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"aria-label\",\"Page navigation\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"pager\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"count\"]]],null,3],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"append\",[\"get\",[\"number\"]],false]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"block\",[\"link-to\"],[\"movies\",[\"helper\",[\"query-params\"],null,[[\"page\"],[[\"get\",[\"number\"]]]]]],null,0],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"active\"],[\"flush-element\"],[\"append\",[\"get\",[\"number\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"number\"]],[\"get\",[\"model\",\"meta\",\"pagination\",\"self\",\"number\"]]],null]],null,2,1],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"number\"]},{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"block\",[\"movie-data\"],null,[[\"movie\",\"search_actor_name\",\"moviesByActor\",\"moviesByDirector\",\"moviesByYear\"],[[\"get\",[\"movie\"]],[\"get\",[\"search_actor_name\"]],[\"helper\",[\"route-action\"],[\"moviesByActor\"],null],[\"helper\",[\"route-action\"],[\"moviesByDirector\"],null],[\"helper\",[\"route-action\"],[\"moviesByYear\"],null]]],4],[\"text\",\"\\n\"]],\"locals\":[\"movie\"]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/movies_list.hbs" } });
});
define("frontend/templates/new-movie", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "tL4Rw7Lr", "block": "{\"statements\":[[\"block\",[\"create-new-movie\"],null,[[\"newMovie\",\"createMovie\",\"suggestedMovies\",\"isLoadingImport\"],[[\"get\",[\"model\"]],\"createMovie\",[\"get\",[\"suggestedMovies\"]],[\"get\",[\"isLoadingImport\"]]]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/new-movie.hbs" } });
});
define("frontend/templates/upload-csv", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rgQ2RHMv", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"x-file-input\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/upload-csv.hbs" } });
});
define('frontend/transforms/movie', ['exports', 'ember-data'], function (exports, _emberData) {

  _emberData['default'].JSONTransforms.array = {
    serialize: function serialize(jsonData) {
      return Ember.typeOf(jsonData) == 'array' ? jsonData : [];
    },
    deserialize: function deserialize(externalData) {
      return Ember.typeOf(externalData) == 'array' ? externalData : [];
    }
  };
});
define('frontend/util-tests/collection-action', ['exports', 'ember-api-actions/util-tests/collection-action'], function (exports, _emberApiActionsUtilTestsCollectionAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberApiActionsUtilTestsCollectionAction['default'];
    }
  });
});
define('frontend/util-tests/member-action', ['exports', 'ember-api-actions/util-tests/member-action'], function (exports, _emberApiActionsUtilTestsMemberAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberApiActionsUtilTestsMemberAction['default'];
    }
  });
});
define('frontend/utils/fmt', ['exports', 'ember-models-table/utils/fmt'], function (exports, _emberModelsTableUtilsFmt) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModelsTableUtilsFmt['default'];
    }
  });
});
define('frontend/views/file-picker', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].View.extend({});
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('frontend/config/environment', ['ember'], function(Ember) {
  var prefix = 'frontend';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("frontend/app")["default"].create({"SERVICES_HOST":"http://localhost:2000","name":"frontend","version":"0.0.0+a7be89b6"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map
