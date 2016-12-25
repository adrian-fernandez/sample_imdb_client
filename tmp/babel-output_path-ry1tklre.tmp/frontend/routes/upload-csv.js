define('frontend/routes/upload-csv', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: service('session'),

    model: function model(params) {
      return this.store.createRecord('movie');
    },

    actions: {
      addChangeListenerToElement: _ember['default'].on('didInsertElement', function () {
        var _this = this;

        var input = this.$()[0];
        console.log("A1");

        input.onchange = function (event) {
          var file = event.target.files[0];
          var reader = new FileReader();
          var fileName = file.name;
          console.log("A2");

          reader.onload = function (event) {
            console.log("A3");
            _this.sendAction('handleFileAsDataURL', fileName, event.target.result);
          };

          reader.readAsDataURL(file);
        };
      })
    }

  });
});