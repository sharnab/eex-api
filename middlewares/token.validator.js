const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (typeof authHeader !== "undefined") {
    if (authHeader || authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("user is not authozied");
        }
        req.user = decoded.user;
        next();
      });

      if (!token) {
        res.status(401);
        throw new Error("Invalid Token");
      }
    }
  } else {
    res.status(401);
    throw new Error("Token can not be empty");
  }
});

module.exports = validateToken;
