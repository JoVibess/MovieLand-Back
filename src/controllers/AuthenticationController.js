const { Router } = require("express");
const bcrypt = require("bcryptjs");

const authenticator = require("../services/authenticator");
const User = require("../models/User");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.post("/login", async (req, res) => {
    try {
      res.send(
        await authenticator.authenticate(req.body.email, req.body.password)
      );
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.post("/register", async (req, res) => {
    try {
      if (!req.body.password) {
        return res.status(400).send("Invalid Password");
      }

      if (!req.body.email) {
        return res.status(400).send("Invalid Email");
      }
      const user = await User.create({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
        firstname: req.body.firstname,
      });

      res.send(await authenticator.authenticate(user.email, req.body.password));
    } catch (e) {
      console.log(e);
      res.status(400).send("Bad Request");
    }
  });
};
