import Ember from 'ember';
import layout from './template';
import uuid from '../../system/uuid';

var get = Ember.get;
var computed = Ember.computed;

var VALID_TAGS = ['a', 'abbr', 'area', 'audio', 'b', 'bdo', 'br', 'canvas', 'cite', 'code', 'command', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'kbd', 'mark', 'math', 'noscript', 'object', 'q', 'ruby', 'samp', 'script', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'time', 'var', 'video', 'wbr'];

export default Ember.Component.extend({
  tagName: 'label',
  classNames: ['file-upload'],

  attributeBindings: ['for'],

  'for': computed({
    get: function get() {
      return 'file-input-' + uuid.short();
    }
  }),

  layout: layout,

  queue: null,

  didInsertElement: function didInsertElement() {
    var id = get(this, 'for');
    Ember.assert('Changing the tagName of {{file-upload}} to "' + get(this, 'tagName') + '" will break interactions.', get(this, 'tagName') === 'label');
    this.$('*').each(function (_, element) {
      if (element.id !== id && VALID_TAGS.indexOf(element.tagName.toLowerCase()) === -1) {
        Ember.assert('"' + element.outerHTML + '" is not allowed as a child of {{file-upload}}.');
      }
    });
  },

  actions: {
    change: function change(files) {
      get(this, 'queue')._addFiles(files);
    }
  }
});