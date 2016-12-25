import Ember from 'ember';

import { strContains } from 'frontend/helpers/str-contains';

export default Ember.Component.extend({
  tagName: '',
  isDetailHidden: true,
  actorName: 'Casting: ',

  actions: {
    toggleDetailHidden: function() {
      this.set('isDetailHidden', !this.isDetailHidden);
    },
    hideDetail: function(){
      this.set('isDetailHidden', false);
    },
    moviesByActor: function(actorId, actorName) {
      this.set('isDetailHidden', true);
      this.sendAction('moviesByActor', { actorId: actorId, actorName: actorName });
    },
    moviesByYear: function(year) {
      this.sendAction('moviesByYear', { year: year });
    },
    moviesByDirector: function(directorName) {
      this.sendAction('moviesByDirector', { directorName: directorName });
    },
    selectedActor: function(actorName){
      this.set('actorName', actorName);
    },
    unselectedActor: function(){
      this.set('actorName', 'Casting: ');
    },
  }
});
