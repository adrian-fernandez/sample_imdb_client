define('frontend/components/create-new-movie/component', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        actions: {
            createMovie: function createMovie(model) {
                this.sendAction('createMovie', model);

                // Clear each input field
                this.set('newMovie.title', null);
                this.set('newMovie.year', null);
                this.set('newMovie.cast', null);
            }
        }
    });
});