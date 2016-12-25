define('frontend/controllers/upload-csv', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    errors: [],
    uploading: false,
    completed: 0,
    type: 'file',
    attributeBindings: ['type', 'value'],

    actions: {
      addChangeListenerToElement: _ember['default'].on('didInsertElement', function () {
        var _this = this;

        var input = this.$()[0];
        console.log("A1");

        input.onchange = function (event) {
          var file = event.target.files[0];
          var reader = new FileReader();
          var fileName = file.name;
          console.log("A2");

          reader.onload = function (event) {
            console.log("A3");
            _this.sendAction('handleFileAsDataURL', fileName, event.target.result);
          };

          reader.readAsDataURL(file);
        };
      })
    }
  });
});