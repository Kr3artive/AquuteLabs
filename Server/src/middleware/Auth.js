const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("TOKEN IS REQUIRED");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("INVALID TOKEN");
    req.user = user;
    next();
  });
};
