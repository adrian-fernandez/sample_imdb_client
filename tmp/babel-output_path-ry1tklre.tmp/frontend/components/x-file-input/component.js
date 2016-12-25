define('frontend/components/x-file-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    uploadedFile: false,

    addChangeListenerToElement: _ember['default'].on('didInsertElement', function () {
      var _this = this;

      var input = this.$("input")[0];

      self = this;
      input.onchange = function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        var fileName = file.name;

        reader.onload = function (event) {
          _this.sendAction('handleFileAsDataURL', self, fileName, event.target.result);
        };

        reader.readAsDataURL(file);
      };
    }),

    handleFileAsDataURL: function handleFileAsDataURL(component, file_name, file_content) {
      $.ajax({
        type: "POST",
        url: "http://localhost:2000/movies/batch_create",
        dataType: 'json',
        data: { data: file_content },
        success: function success(data) {
          component.set('uploaded_movies', data['uploaded_movies']);
          component.set('imported_movies', data['imported_movies']);
          component.set('error_movies', data['error_movies']);
        }
      });

      component.set('uploadedFile', true);
    }

  });
});