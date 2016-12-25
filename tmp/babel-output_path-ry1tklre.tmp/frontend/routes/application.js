define('frontend/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  var _slice = Array.prototype.slice;
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),

    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      },
      toRoute: function toRoute() {
        var _transitionTo;

        (_transitionTo = this.transitionTo).call.apply(_transitionTo, [this].concat(_slice.call(arguments)));
        return true;
      },
      handleFileAsDataURL: function handleFileAsDataURL(file_name, file_content) {
        console.log("Handle");

        $.ajax({
          type: "POST",
          url: "http://localhost:2000/movies/batch_create",
          data: { data: file_content }
        });

        Frontend.set('isFileUploaded', true);
      }
    }
  });
});