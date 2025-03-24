module.exports = function (app, router) {
  require("./UserController")(app, router);
  require("./MovieController")(app, router);
  require("./ReservationController")(app, router);
  require("./AuthenticationController")(app, router);

};
