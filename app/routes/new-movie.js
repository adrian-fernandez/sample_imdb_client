import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session :service('session'),

  model(params) {
    if(this.get('importedModel')){
      var importedModel = this.get('importedModel');
      this.set('importedModel', null);
      return importedModel;
    }else{
      if (this.get('newMovie')){
        return this.get('newMovie');
      }else{
        return this.store.createRecord('movie');
      }
    }
  },

  actions: {
    createMovie: function(model) {
      let movie = this.store.createRecord('movie', {
        title: model.get('title'),
        director: model.get('director'),
        year: model.get('year'),
        rate: model.get('rate'),
        poster: model.get('poster'),
        actors: model.get('actors'),
        imdb_id: model.get('imdb_id')
      });

      self = this;
      movie.save().then(function(obj){
        self.controller.set('suggestedMovies', null);
        self.transitionTo('movies');
      }, function(err){
        self.set('newMovie', movie);
        self.controller.set('errors', movie.get('errors').toArray());
        self.refresh();
      }).catch((adapterError) => {
        console.log(adapterError);
        self.controller.set('errors', movie.get('errors').toArray());
      });
    },
    guessMovie: function(title){
      if(title.length < 3){
        this.controller.set('suggestedMovies', null);
      }else{
        let movie = this.store.createRecord('movie', { title: title });

        self = this;
        movie.getSuggestions({ title: title }).then(function(obj){
          self.controller.set('suggestedMovies', obj);
        });
      }
    },
    importMovie: function(imdb_id){
      this.controller.set('isLoadingImport', true);
      let movie = this.store.createRecord('movie', { imdb_id: imdb_id });
      self = this;
      movie.getMovie({ imdb: imdb_id }).then(function(obj){
        let actors = obj.data.attributes.actors.map(function(x){return x.name;}).join(',');
        let director = obj.data.attributes.director.name;
        self.set('importedModel', self.store.createRecord('movie', {
                                                                     title: obj.data.attributes.title,
                                                                     year: obj.data.attributes.year,
                                                                     director: director,
                                                                     actors: actors,
                                                                     imdb_id: obj.data.attributes['imdb-id'],
                                                                     poster: obj.data.attributes.poster,
                                                                     rate: obj.data.attributes.rate
                                                                   }));
        self.controller.set('isLoadingImport', false);
        self.refresh();
      });
    }
  }
});
