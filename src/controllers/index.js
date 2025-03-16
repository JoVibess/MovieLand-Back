module.exports = function (app, router) {
  require("./UserController")(app, router);
  require("./PostController")(app, router);
  require("./AuthenticationController")(app, router);
};
