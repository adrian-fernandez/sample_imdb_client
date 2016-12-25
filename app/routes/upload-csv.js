import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),

  model(params) {
    return this.store.createRecord('movie');     
  },

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
