define('ember-file-upload/system/dropzone', ['exports', 'ember', 'ember-file-upload/system/data-transfer'], function (exports, _ember, _emberFileUploadSystemDataTransfer) {
  'use strict';

  var $ = _ember['default'].$;
  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var bind = _ember['default'].run.bind;

  var DATA_TRANSFER = Symbol();

  var supported = (function () {
    return 'draggable' in document.createElement('span');
  })();

  exports['default'] = _ember['default'].Object.extend({

    'for': null,

    supported: supported,

    ondragenter: null,

    ondragleave: null,

    queue: null,

    init: function init() {
      this._super();
      var id = get(this, 'for');
      var handlers = this._dragHandlers = {
        dragenter: bind(this, 'didEnterDropzone'),
        dragleave: bind(this, 'didLeaveDropzone'),
        dragover: bind(this, 'didDragOver'),
        drop: bind(this, 'didDrop')
      };

      Object.keys(handlers).forEach(function (key) {
        $(document).on(key, '#' + id, handlers[key]);
      });
    },

    destroy: function destroy() {
      var id = get(this, 'for');
      var handlers = this._dragHandlers || {};
      Object.keys(handlers).forEach(function (key) {
        $(document).off(key, '#' + id, handlers[key]);
      });

      this._dropzoneEntrance = null;
      this._super();
    },

    didEnterDropzone: function didEnterDropzone(_ref) {
      var evt = _ref.originalEvent;

      var element = document.getElementById(get(this, 'for'));
      var entrance = this._dropzoneEntrance;

      if (entrance == null || $.contains(element, entrance)) {
        this._dropzoneEntrance = evt.target;

        var dataTransfer = _emberFileUploadSystemDataTransfer['default'].create({
          queue: get(this, 'queue'),
          dataTransfer: evt.dataTransfer
        });
        this[DATA_TRANSFER] = dataTransfer;

        set(this, 'active', true);
        set(this, 'valid', get(dataTransfer, 'valid'));
        this.recompute();

        if (this.ondragenter) {
          this.ondragenter(dataTransfer);
        }
      }
    },

    didLeaveDropzone: function didLeaveDropzone(_ref2) {
      var evt = _ref2.originalEvent;

      var element = document.getElementById(get(this, 'for'));

      // If the element paired with the dragenter
      // event was removed from the DOM, clear it out
      // so the process can be run again.
      if (!$.contains(element, this._dropzoneEntrance)) {
        this._dropzoneEntrance = null;
      }

      if (evt.target === this._dropzoneEntrance) {
        if (this.ondragleave) {
          set(this[DATA_TRANSFER], 'dataTransfer', evt.dataTransfer);
          this.ondragleave(this[DATA_TRANSFER]);
          this[DATA_TRANSFER] = null;
        }
        set(this, 'active', false);
        this._dropzoneEntrance = null;
        this.recompute();
      }
    },

    didDragOver: function didDragOver(_ref3) {
      var evt = _ref3.originalEvent;

      set(this[DATA_TRANSFER], 'dataTransfer', evt.dataTransfer);
      evt.preventDefault();
      evt.stopPropagation();
    },

    didDrop: function didDrop(_ref4) {
      var evt = _ref4.originalEvent;

      if (evt.preventDefault) {
        evt.preventDefault();
      }
      if (evt.stopPropagation) {
        evt.stopPropagation();
      }
      this._dropzoneEntrance = null;

      set(this[DATA_TRANSFER], 'dataTransfer', evt.dataTransfer);
      if (this.ondrop) {
        this.ondrop(this[DATA_TRANSFER]);
      }

      set(this, 'active', false);
      get(this, 'queue')._addFiles(get(this[DATA_TRANSFER], 'files'));
      this.recompute();
      this[DATA_TRANSFER] = null;
      evt.preventDefault();
      evt.stopPropagation();
    },

    /**
      Render a helpful warning when calling toString() on
      a dropzone, since it should always be used with the `{{#with}}`
      helper.
     */
    toString: function toString() {
      return '\n      You\'re using {{#file-dropzone}} as a helper instead of a sub-expression.\n      It\'s recommended to use file-dropzone as a sub-expression:\n\n      {{#with (file-dropzone for="app" queue=(file-queue for="designs")) as |dropzone|}}\n        {{! Your dropzone display logic goes here }}\n      {{/with}}\n    ';
    }
  });
});