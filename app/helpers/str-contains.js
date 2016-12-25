import Ember from 'ember';

export function strContains(strs) {
  if (strs[0].length === 0 || strs[1].length === 0){
    return -1;
  }
  return (strs[0].toLowerCase().indexOf(strs[1].toLowerCase()));
}

export default Ember.Helper.helper(strContains);