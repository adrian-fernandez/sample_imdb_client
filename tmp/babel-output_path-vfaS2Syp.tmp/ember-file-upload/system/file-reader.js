define('ember-file-upload/system/file-reader', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var RSVP = _ember['default'].RSVP;

  exports['default'] = function () {
    var _this = this;

    var _RSVP$defer = RSVP.defer();

    var resolve = _RSVP$defer.resolve;
    var reject = _RSVP$defer.reject;
    var promise = _RSVP$defer.promise;

    var reader = new FileReader();

    reader.onload = resolve;
    reader.onerror = reject;

    var aborted = RSVP.defer();
    promise.cancel = function () {
      reader.abort();
      return aborted.promise;
    };
    reader.onabort = function () {
      aborted.resolve();
    };

    ['readAsArrayBuffer', 'readAsDataURL', 'readAsBinaryString', 'readAsText'].forEach(function (methodName) {
      _this[methodName] = function (blob) {
        reader[methodName](blob);
        return promise.then(function () {
          return reader.result;
        }, function () {
          return RSVP.reject(reader.error);
        });
      };
    });
  };
});