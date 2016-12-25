import Ember from 'ember';
import Dropzone from '../system/dropzone';

export default Ember.Helper.extend({
  compute: function compute(_, hash) {
    var _this = this;

    var dropzone = this._dropzone;

    if (!hash['for']) {
      return dropzone;
    }

    if (dropzone) {
      dropzone.setProperties(hash);
    } else {
      dropzone = this._dropzone = Dropzone.create(Ember.merge({
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