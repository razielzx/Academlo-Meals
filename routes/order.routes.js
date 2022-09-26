const express = require("express");
const { protectSession } = require("../middlewares/auth.middleware");
const {
  createOrder,
  allOrderByUser,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controllers");
const {checkOrder} = require('../middlewares/order.middlewares')
const orderRouter = express.Router();

orderRouter.use(protectSession);

orderRouter.post("/", createOrder);
orderRouter.get("/me", allOrderByUser);
orderRouter.patch("/:id",checkOrder, updateOrder);
orderRouter.delete("/:id",checkOrder, deleteOrder);

module.exports = {
  orderRouter,
};
