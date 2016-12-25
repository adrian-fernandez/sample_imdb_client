define('ember-models-table/helpers/exists-in', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  })();

  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var computed = _ember['default'].computed;
  var observer = _ember['default'].observer;

  exports['default'] = _ember['default'].Helper.extend({
    content: computed('needle', 'haystack.[]', function () {
      var needle = get(this, 'needle');
      var haystack = get(this, 'haystack');
      return haystack.includes(needle);
    }).readOnly(),

    compute: function compute(_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var haystack = _ref2[0];
      var needle = _ref2[1];

      set(this, 'needle', needle);
      set(this, 'haystack', haystack);
      return get(this, 'content');
    },

    contentDidChange: observer('content', function () {
      this.recompute();
    })
  });
});