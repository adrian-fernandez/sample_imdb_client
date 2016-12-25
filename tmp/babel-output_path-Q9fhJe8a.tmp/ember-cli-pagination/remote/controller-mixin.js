define("ember-cli-pagination/remote/controller-mixin", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  exports["default"] = _ember["default"].Mixin.create({
    queryParams: ["page", "perPage"],

    pageBinding: "content.page",

    totalPagesBinding: "content.totalPages",

    pagedContentBinding: "content"
  });
});