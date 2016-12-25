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