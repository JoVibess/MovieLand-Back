const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function requireAuthentication(req, res, next) {
  jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET,
    async (err, data) => {
      if (err) {
        return res.status(401).send("Unautorized");
      }

      if (data?.id) {
        req.user = await User.findOne({
          where: {
            id: data.id,
          },
        });
      }

      if (!req.user) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      next();
    }
  );
};
