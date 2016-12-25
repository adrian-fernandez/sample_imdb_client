export { initialize };
import Ember from 'ember';
import LinkActionMixin from '../mixins/link-action';

var LinkComponent = Ember.LinkComponent;

function initialize() {
  LinkComponent.reopen(LinkActionMixin);
}

export default {
  name: 'allow-link-action',
  initialize: initialize
};