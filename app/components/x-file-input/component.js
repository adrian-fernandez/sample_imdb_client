import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  uploadedFile: false,
  uploadingFile: false,

  addChangeListenerToElement: Ember.on('didInsertElement', function() {
    let input = this.$("input")[0];

    self = this;
    input.onchange = (event) => {
      self.set('uploadingFile', true);
      let file = event.target.files[0];
      let reader = new FileReader();
      let fileName = file.name;

      reader.onload = (event) => {
        this.sendAction('handleFileAsDataURL', self, fileName, event.target.result);
      };

      reader.readAsDataURL(file);
    };
  }),

  handleFileAsDataURL: function(component, file_name, file_content){
    $.ajax({
      type: "POST",
      url: "http://imdb-backend.herokuapp.com/movies/batch_create",
      dataType: 'json',
      data: { data: file_content },
      success: function(data){
        component.set('uploaded_movies', data['uploaded_movies']);
        component.set('imported_movies', data['imported_movies']);
        component.set('error_movies', data['error_movies']);

        component.set('uploadingFile', false);
        component.set('uploadedFile', true);
      }
    });
  }

});