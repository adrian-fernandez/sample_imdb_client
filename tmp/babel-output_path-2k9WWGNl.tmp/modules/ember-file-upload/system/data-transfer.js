import Ember from 'ember';
import trim from './trim';

var _get = Ember.get;
var computed = Ember.computed;

export default Ember.Object.extend({

  dataTransfer: null,

  queue: null,

  valid: computed('dataTransfer.files', 'files', {
    get: function get() {
      if (_get(this, 'files') == null) {
        return true;
      }

      return _get(this, 'dataTransfer.items.length') === _get(this, 'files.length');
    }
  }),

  files: computed('queue.multiple', 'queue.accept', 'dataTransfer', {
    get: function get() {
      var fileList = _get(this, 'dataTransfer.files');
      var itemList = _get(this, 'dataTransfer.items');

      if (fileList && itemList && itemList.length > fileList.length) {
        fileList = itemList;
      }

      if (fileList == null) {
        return null;
      }

      var files = [];
      if (!_get(this, 'queue.multiple') && fileList.length > 1) {
        files.push(fileList[0]);
      } else {
        for (var i = 0, len = fileList.length; i < len; i++) {
          files.push(fileList[i]);
        }
      }

      var accept = _get(this, 'queue.accept') || '';
      var tokens = accept.split(',').map(function (token) {
        return trim(token).toLowerCase();
      });
      var extensions = tokens.filter(function (token) {
        return token.indexOf('.') === 0;
      });
      var mimeTypes = tokens.filter(function (token) {
        return token.indexOf('.') !== 0;
      }).map(function (mimeType) {
        return new RegExp(mimeType);
      });

      return files.filter(function (file) {
        var extension = null;
        if (file.name && /(\.[^.]+)$/.test(file.name)) {
          extension = file.name.toLowerCase().match(/(\.[^.]+)$/)[1];
        }

        var type = file.type.toLowerCase();
        return mimeTypes.find(function (mimeType) {
          return mimeType.test(type);
        }) || extensions.indexOf(extension) !== -1;
      });
    }
  })

});