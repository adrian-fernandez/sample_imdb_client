define('frontend/helpers/str-contains', ['exports', 'ember'], function (exports, _ember) {
  exports.strContains = strContains;

  function strContains(strs) {
    if (strs[0].length === 0 || strs[1].length === 0) {
      return -1;
    }
    return strs[0].toLowerCase().indexOf(strs[1].toLowerCase());
  }

  exports['default'] = _ember['default'].Helper.helper(strContains);
});