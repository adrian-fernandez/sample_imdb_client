define('ember-file-upload/helpers/file-dropzone', ['exports', 'ember', 'ember-file-upload/system/dropzone'], function (exports, _ember, _emberFileUploadSystemDropzone) {
  'use strict';

  exports['default'] = _ember['default'].Helper.extend({
    compute: function compute(_, hash) {
      var _this = this;

      var dropzone = this._dropzone;

      if (!hash['for']) {
        return dropzone;
      }

      if (dropzone) {
        dropzone.setProperties(hash);
      } else {
        dropzone = this._dropzone = _emberFileUploadSystemDropzone['default'].create(_ember['default'].merge({
          queue: hash.queue,
          recompute: function recompute() {
            return _this.recompute();
          }
        }, hash));
      }

      return dropzone;
    },

    destroy: function destroy() {
      this._dropzone.destroy();
      this._dropzone = null;
    }
  });
});