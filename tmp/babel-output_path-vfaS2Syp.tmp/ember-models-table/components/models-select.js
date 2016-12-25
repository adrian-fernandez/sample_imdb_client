define('ember-models-table/components/models-select', ['exports', 'ember', 'ember-models-table/templates/components/models-select'], function (exports, _ember, _emberModelsTableTemplatesComponentsModelsSelect) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({

    layout: _emberModelsTableTemplatesComponentsModelsSelect['default'],

    tagName: 'select',

    classNameBindings: ['cssPropertyName'],

    cssPropertyName: '',

    change: function change() {
      this.set('value', this.$('option:selected').val());
    }

  });
});