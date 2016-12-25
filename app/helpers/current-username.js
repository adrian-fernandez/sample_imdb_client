import Ember from 'ember';

export function currentUsername() {
  return Frontend.get('userName');
}

export default Ember.Helper.helper(currentUsername);