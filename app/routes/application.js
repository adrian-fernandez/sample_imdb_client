import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    },
    toRoute: function(){
      this.transitionTo.call(this, ...arguments);
      return true;
    },
    handleFileAsDataURL: function(file_name, file_content){
      console.log("Handle");

      $.ajax({
        type: "POST",
        url: "http://localhost:2000/movies/batch_create",
        data: { data: file_content }
      });

      Frontend.set('isFileUploaded', true);
    }
  }
});
