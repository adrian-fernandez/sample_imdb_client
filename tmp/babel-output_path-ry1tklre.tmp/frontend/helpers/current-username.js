define('frontend/helpers/current-username', ['exports', 'ember'], function (exports, _ember) {
  exports.currentUsername = currentUsername;

  function currentUsername() {
    return Frontend.get('userName');
  }

  exports['default'] = _ember['default'].Helper.helper(currentUsername);
});