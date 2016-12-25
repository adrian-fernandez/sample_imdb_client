define('ember-file-upload/file', ['exports', 'ember', 'ember-file-upload/system/file-reader', 'ember-file-upload/system/http-request', 'rsvp', 'ember-file-upload/system/uuid', 'ember-metal/get', 'ember-metal/set'], function (exports, _ember, _emberFileUploadSystemFileReader, _emberFileUploadSystemHttpRequest, _rsvp, _emberFileUploadSystemUuid, _emberMetalGet, _emberMetalSet) {
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

  /* global atob */

  var computed = _ember['default'].computed;
  var reads = computed.reads;

  function normalizeOptions(file, url, options) {
    if (typeof url === 'object') {
      options = url;
      url = null;
    }

    options = options || {};

    options.url = options.url || url;
    options.method = options.method || 'POST';
    options.accepts = options.accepts || ['application/json', 'text/javascript'];
    options.contentType = options.contentType || (0, _emberMetalGet['default'])(file, 'type');
    options.headers = options.headers || {};
    options.data = options.data || {};
    options.fileKey = options.fileKey || 'file';

    if (options.headers.Accept == null) {
      if (!Array.isArray(options.accepts)) {
        options.accepts = [options.accepts];
      }
      options.headers.Accept = options.accepts.join(',');
    }

    // Set Content-Type in the data payload
    // instead of the headers, since the header
    // for Content-Type will always be multipart/form-data
    if (options.contentType) {
      options.data['Content-Type'] = options.contentType;
    }

    options.data[options.fileKey] = file.blob;

    return options;
  }

  var inflightRequests = 0;
  if (_ember['default'].Test) {
    _ember['default'].Test.registerWaiter(null, function () {
      return inflightRequests === 0;
    });
  }

  exports['default'] = _ember['default'].Object.extend({

    init: function init() {
      this._super();
      Object.defineProperty(this, 'id', {
        writeable: false,
        enumerable: true,
        value: 'file-' + (0, _emberFileUploadSystemUuid['default'])()
      });
    },

    /**
      A unique id generated for this file.
       @property
      @type {String}
      @readonly
     */
    id: null,

    /**
      The file name.
       @property name
      @type {String}
     */
    name: reads('blob.name'),

    /**
      The size of the file in bytes.
       @property size
      @type {Number}
      @readonly
     */
    size: reads('blob.size'),

    /**
      The MIME type of the file.
       For a image file this may be `image/png`.
       @property type
      @type {String}
      @readonly
     */
    type: reads('blob.type'),

    /**
      Returns the appropriate file extension of
      the file according to the type
       @property extension
      @type {String}
      @readonly
     */
    extension: computed('type', {
      get: function get() {
        return (0, _emberMetalGet['default'])(this, 'type').split('/').slice(-1)[0];
      }
    }),

    /**
      @property loaded
      @type {Number}
      @default 0
      @readonly
     */
    loaded: 0,

    /**
      @property progress
      @type {Number}
      @default 0
      @readonly
     */
    progress: 0,

    /**
      The current state that the file is in.
      One of:
       - `queued`
      - `uploading`
      - `timed_out`
      - `aborted`
      - `uploaded`
      - `failed`
       @property state
      @type {String}
      @default 'queued'
      @readonly
     */
    state: 'queued',

    upload: function upload(url, opts) {
      var _this = this;

      if (['queued', 'failed', 'timed_out'].indexOf((0, _emberMetalGet['default'])(this, 'state')) === -1) {
        _ember['default'].assert('The file ' + this.id + ' is in the state "' + (0, _emberMetalGet['default'])(this, 'state') + '" and cannot be requeued.');
      }

      var options = normalizeOptions(this, url, opts);

      // Build the form
      var form = new FormData();

      Object.keys(options.data).forEach(function (key) {
        if (key === options.fileKey) {
          form.append(key, options.data[key], (0, _emberMetalGet['default'])(_this, 'name'));
        } else {
          form.append(key, options.data[key]);
        }
      });

      var request = new _emberFileUploadSystemHttpRequest['default']();
      request.open(options.method, options.url);

      Object.keys(options.headers).forEach(function (key) {
        request.setRequestHeader(key, options.headers[key]);
      });

      if (options.timeout) {
        request.timeout = options.timeout;
      }

      request.onprogress = function (evt) {
        if (evt.lengthComputable) {
          (0, _emberMetalSet['default'])(_this, 'loaded', evt.loaded);
          (0, _emberMetalSet['default'])(_this, 'size', evt.total);
          (0, _emberMetalSet['default'])(_this, 'progress', evt.loaded / evt.total * 100);
        }
      };

      request.ontimeout = function () {
        (0, _emberMetalSet['default'])(_this, 'state', 'timed_out');
      };

      request.onabort = function () {
        (0, _emberMetalSet['default'])(_this, 'state', 'aborted');
      };

      (0, _emberMetalSet['default'])(this, 'state', 'uploading');

      // Increment for Ember.Test
      inflightRequests++;

      return request.send(form).then(function (result) {
        (0, _emberMetalSet['default'])(_this, 'state', 'uploaded');
        return result;
      }, function (error) {
        (0, _emberMetalSet['default'])(_this, 'state', 'failed');
        return _rsvp['default'].reject(error);
      })['finally'](function () {
        // Decrement for Ember.Test
        inflightRequests--;
      });
    },

    read: function read() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? { as: 'data-url' } : arguments[0];

      var reader = new _emberFileUploadSystemFileReader['default']();

      var blob = this.blob;
      switch (options.as) {
        case 'array-buffer':
          return reader.readAsArrayBuffer(blob);
        case 'data-url':
          return reader.readAsDataURL(blob);
        case 'binary-string':
          return reader.readAsBinaryString(blob);
        case 'text':
          return reader.readAsText(blob);
      }
    }
  }).reopenClass({

    /**
      Creates a file object that can be read or uploaded to a
      server from a Blob object.
       @method fromBlob
      @param {Blob} blob The blob to create the file from.
      @return {File} A file object
     */
    fromBlob: function fromBlob(blob) {
      var file = this.create();
      Object.defineProperty(file, 'blob', {
        writeable: false,
        enumerable: false,
        value: blob
      });

      return file;
    },

    fromDataURL: function fromDataURL(dataURL) {
      var _dataURL$split = dataURL.split(',');

      var _dataURL$split2 = _slicedToArray(_dataURL$split, 2);

      var typeInfo = _dataURL$split2[0];
      var base64String = _dataURL$split2[1];

      var mimeType = typeInfo.match(/:(.*?);/)[1];

      var binaryString = atob(base64String);
      var binaryData = new Uint8Array(binaryString.length);

      for (var i = 0, len = binaryString.length; i < len; i++) {
        binaryData[i] = binaryString.charCodeAt(i);
      }

      var blob = new Blob([binaryData], { type: mimeType });

      return this.fromBlob(blob);
    }
  });
});