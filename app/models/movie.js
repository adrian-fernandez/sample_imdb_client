import DS from 'ember-data';
import { memberAction, collectionAction } from 'ember-api-actions';

export default DS.Model.extend({
  poster: DS.attr('string'),
  title: DS.attr('string'),
  year: DS.attr('number'),
  rate: DS.attr('string'),
  imdb_id: DS.attr('string'),
  director: DS.attr(),
  actors: DS.attr(),
  getSuggestions: collectionAction({
    path: 'suggestions',
    type: 'get',
    urlType: 'findRecord'
  }),
  getMovie: collectionAction({
    path: 'get_movie',
    type: 'get',
    urlType: 'findRecord'
  })
});
