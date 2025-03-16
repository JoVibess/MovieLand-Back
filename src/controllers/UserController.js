const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get(
    "/users",
    [requireAuth, requireRoles(["USER"])],
    async (req, res) => {
      res.send(await User.findAll());
    }
  );

  router.get("/users/me", [requireAuth], async (req, res) => {
    res.send(req.user);
  });
};

router.get("/movies", async (req, res) => {
  res.send(
    await Session.findAll({
      include: [
        { model: Movie, required: true },
        { model: Room, required: true },
      ],
    })
  );
});

router.get("/movies/:date", async (req, res) => {
  const date = req.params.date;
  res.send(
    await Session.findAll({
      include: [
        { model: Movie, required: true },
        { model: Room, required: true },
      ],
      where: {
        start_time: {
          [Op.gte]: new Date(`${date}T00:00:00`),
          [Op.lt]: new Date(`${date}T23:59:59`),
        },
      },
    })
  );
});