"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('frontend/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTAdapter.extend({
    host: 'http://intuo-backend.herokuapp.com',
    primaryKey: 'id'
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
define('frontend/components/create-new-movie/component', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        actions: {
            createMovie: function createMovie(model) {
                this.sendAction('createMovie', model);

                // Clear each input field
                this.set('newMovie.title', null);
                this.set('newMovie.year', null);
                this.set('newMovie.cast', null);
            }
        }
    });
});
define("frontend/components/create-new-movie/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "AWN4nSek", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Create a New Movie\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"NewMovie\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\"],[[\"get\",[\"newMovie\",\"title\"]],\"Title\"]]],false],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],[[\"helper\",[\"-input-type\"],[[\"get\",[\"number\"]]],null]],[[\"value\",\"type\",\"placeholder\"],[[\"get\",[\"newMovie\",\"year\"]],[\"get\",[\"number\"]],\"Year\"]]],false],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\"],[[\"get\",[\"newMovie\",\"cast\"]],\"Cast\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createMovie\",[\"get\",[\"newMovie\"]]]],[\"flush-element\"],[\"text\",\"Publish\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/components/create-new-movie/template.hbs" } });
});
define('frontend/components/movie-data/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define("frontend/components/movie-data/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "OYR7ya/5", "block": "{\"statements\":[[\"open-element\",\"article\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"arg\",[\"movie\",\"poster\"]],null],[\"flush-element\"],[\"close-element\"],[\"append\",[\"arg\",[\"movie\",\"title\"]],false],[\"text\",\"\\n    \"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[\"movie\"],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/components/movie-data/template.hbs" } });
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
define('frontend/helpers/app-version', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _frontendConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('frontend/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('frontend/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
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
define("frontend/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('frontend/models/movie', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    poster: _emberData['default'].attr('string'),
    title: _emberData['default'].attr('string'),
    year: _emberData['default'].attr('number'),
    rate: _emberData['default'].attr('number'),
    casting: _emberData['default'].attr('string')
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

  Router.map(function () {});

  exports['default'] = Router;
});
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
define('frontend/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("frontend/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5Eeui2C/", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"static-attr\",\"id\",\"title\"],[\"flush-element\"],[\"text\",\"Film Collection\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/application.hbs" } });
});
define("frontend/templates/components/page-numbers", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Notirilg", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"pagination-centered\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"pagination\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"canStepBackward\"]]],null,7,6],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"pageItems\"]]],null,5],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"canStepForward\"]]],null,1,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"arrow next disabled\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPage\",1]],[\"flush-element\"],[\"text\",\"»\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"arrow next enabled-arrow\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPage\",1]],[\"flush-element\"],[\"text\",\"»\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"page-number\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"pageClicked\",[\"get\",[\"item\",\"page\"]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"page\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"active page-number\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"a\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"item\",\"page\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dots disabled\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"...\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"item\",\"dots\"]]],null,4],[\"block\",[\"if\"],[[\"get\",[\"item\",\"current\"]]],null,3,2]],\"locals\":[\"item\"]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"arrow prev disabled\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPage\",-1]],[\"flush-element\"],[\"text\",\"«\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"arrow prev enabled-arrow\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPage\",-1]],[\"flush-element\"],[\"text\",\"«\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/page-numbers.hbs" } });
});
define("frontend/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "1OO2Eona", "block": "{\"statements\":[[\"text\",\"Welcome to Film Collection!\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"pagedContent\"]]],null,3],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"page-numbers\"],null,[[\"content\",\"showFL\"],[[\"get\",[\"pagedContent\"]],true]]],false],[\"text\",\"\\n\\n\"],[\"block\",[\"create-new-movie\"],null,[[\"newMovie\",\"createMovie\"],[[\"get\",[\"model\"]],\"createMovie\"]],0],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[],\"locals\":[]},{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"block\",[\"movie-data\"],null,[[\"movie\"],[[\"get\",[\"movie\"]]]],1],[\"text\",\"\\n\"]],\"locals\":[\"movie\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,2]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/index.hbs" } });
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
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+afd10e16"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map
