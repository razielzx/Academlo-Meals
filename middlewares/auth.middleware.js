const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models/user.model");

const protectSession = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(400).json({
      status: "error",
      messages: "token not avilid",
    });
  }
  // Verify the token
  const decoded = jwt.verify(token, "jharol");

  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });
  if (!user) {
    return res.status(400).json({
      status: "error",
      messages: "user not found",
    });
  }
  req.session = user;
  next();
};
module.exports = {
  protectSession,
};
