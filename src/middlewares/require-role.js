module.exports = function requireRoles(roles) {
  return function (req, res, next) {
    console.log(roles, req.user.role);

    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send("Forbbiden");
    }
  };
};
