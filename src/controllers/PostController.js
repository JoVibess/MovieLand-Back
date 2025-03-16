const { Router } = require("express");
const requireAuth = require("../middlewares/require-auth");
const Post = require("../models/Post");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get("/posts/:post_id", [requireAuth], async (req, res) => {
    res.send(req.result);
  });

  router.post("/posts", [requireAuth], async (req, res) => {
    if (!req.body.text) {
      return res.status(400).send("Invalid post data");
    }

    const post = await Post.create({
      text: req.body.text,
      userId: req.user.id,
    });
    res.send(post);
  });
};
