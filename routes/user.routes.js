const express = require("express");
const { createUserValidators } = require("../controllers/validations");
const { protectSession } = require("../middlewares/auth.middleware");
const { checkUser } = require("../middlewares/user.middlewares");
const {
  createUser,
  allUser,
  login,
  updateUser,
  deleteUser,
  allOrders,
  orderById,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.post("/signup", createUserValidators, createUser);
userRouter.get("/", allUser);
userRouter.post("/login", login);

userRouter.use(protectSession);

userRouter.patch("/:id", checkUser, updateUser);
userRouter.delete("/:id", checkUser, deleteUser);
userRouter.get("/orders", allOrders);
userRouter.get("/orders/:id", orderById);

module.exports = {
  userRouter,
};
