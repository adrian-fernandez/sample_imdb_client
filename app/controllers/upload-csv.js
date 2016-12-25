import Ember from 'ember';

export default Ember.Controller.extend({
  errors: [],
  uploading: false,
  completed: 0,
  type: 'file',
  attributeBindings: ['type', 'value'],

  actions: {
    addChangeListenerToElement: Ember.on('didInsertElement', function() {
      let input = this.$()[0];
      console.log("A1");

      input.onchange = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        let fileName = file.name;
        console.log("A2");

        reader.onload = (event) => {
          console.log("A3");
          this.sendAction('handleFileAsDataURL', fileName, event.target.result);
        };

        reader.readAsDataURL(file);
      };
    })
  }
});
