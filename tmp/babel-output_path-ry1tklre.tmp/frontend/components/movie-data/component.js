define('frontend/components/movie-data/component', ['exports', 'ember', 'frontend/helpers/str-contains'], function (exports, _ember, _frontendHelpersStrContains) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    isDetailHidden: true,
    actorName: 'Casting: ',

    actions: {
      toggleDetailHidden: function toggleDetailHidden() {
        this.set('isDetailHidden', !this.isDetailHidden);
      },
      hideDetail: function hideDetail() {
        this.set('isDetailHidden', false);
      },
      moviesByActor: function moviesByActor(actorId, actorName) {
        this.set('isDetailHidden', true);
        this.sendAction('moviesByActor', { actorId: actorId, actorName: actorName });
      },
      moviesByYear: function moviesByYear(year) {
        this.sendAction('moviesByYear', { year: year });
      },
      moviesByDirector: function moviesByDirector(directorName) {
        this.sendAction('moviesByDirector', { directorName: directorName });
      },
      selectedActor: function selectedActor(actorName) {
        this.set('actorName', actorName);
      },
      unselectedActor: function unselectedActor() {
        this.set('actorName', 'Casting: ');
      }
    }
  });
});