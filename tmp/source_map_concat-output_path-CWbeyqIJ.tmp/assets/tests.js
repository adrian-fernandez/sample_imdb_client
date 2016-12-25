'use strict';

define('frontend/tests/adapters/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('frontend/tests/app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 4, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 6, col 1, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\napp.js: line 13, col 3, \'object short notation\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\napp.js: line 18, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n7 errors');
  });
});
define('frontend/tests/components/create-new-movie/component.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/create-new-movie/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/create-new-movie/component.js should pass jshint.\ncomponents/create-new-movie/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/create-new-movie/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('frontend/tests/components/movie-data/component.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/movie-data/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/movie-data/component.js should pass jshint.\ncomponents/movie-data/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/movie-data/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('frontend/tests/controllers/movies_controller.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/movies_controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/movies_controller.js should pass jshint.\ncontrollers/movies_controller.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/movies_controller.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('frontend/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('frontend/tests/helpers/destroy-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('frontend/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'frontend/tests/helpers/start-app', 'frontend/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _frontendTestsHelpersStartApp, _frontendTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _frontendTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _frontendTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('frontend/tests/helpers/module-for-acceptance.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('frontend/tests/helpers/resolver', ['exports', 'frontend/resolver', 'frontend/config/environment'], function (exports, _frontendResolver, _frontendConfigEnvironment) {

  var resolver = _frontendResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _frontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _frontendConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('frontend/tests/helpers/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('frontend/tests/helpers/start-app', ['exports', 'ember', 'frontend/app', 'frontend/config/environment'], function (exports, _ember, _frontendApp, _frontendConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    // use defaults, but you can override
    var attributes = _ember['default'].assign({}, _frontendConfigEnvironment['default'].APP, attrs);

    _ember['default'].run(function () {
      application = _frontendApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('frontend/tests/helpers/start-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('frontend/tests/integration/components/create-new-movie/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('create-new-movie', 'Integration | Component | create new movie', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'hja1JYs6',
      'block': '{"statements":[["append",["unknown",["create-new-movie"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'OAspauQw',
      'block': '{"statements":[["text","\\n"],["block",["create-new-movie"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('frontend/tests/integration/components/create-new-movie/component-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/create-new-movie/component-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/create-new-movie/component-test.js should pass jshint.');
  });
});
define('frontend/tests/integration/components/movie-data/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('movie-data', 'Integration | Component | movie data', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'CousCyIS',
      'block': '{"statements":[["append",["unknown",["movie-data"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'TtDNPd+B',
      'block': '{"statements":[["text","\\n"],["block",["movie-data"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('frontend/tests/integration/components/movie-data/component-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/movie-data/component-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/movie-data/component-test.js should pass jshint.');
  });
});
define('frontend/tests/models/movie.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/movie.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/movie.js should pass jshint.\nmodels/movie.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/movie.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('frontend/tests/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'resolver.js should pass jshint.\nresolver.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nresolver.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('frontend/tests/router.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 4, col 1, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nrouter.js: line 12, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
  });
});
define('frontend/tests/routes/index.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 13, col 7, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });
});
define('frontend/tests/test-helper', ['exports', 'frontend/tests/helpers/resolver', 'ember-qunit'], function (exports, _frontendTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_frontendTestsHelpersResolver['default']);
});
define('frontend/tests/test-helper.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('frontend/tests/unit/models/movie-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('movie', 'Unit | Model | movie', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('frontend/tests/unit/models/movie-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/movie-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/movie-test.js should pass jshint.');
  });
});
define('frontend/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('frontend/tests/unit/routes/index-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('frontend/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
