const { Order } = require("../models/order.model");

const checkOrder = async (req, res, next) => {
  const { id } = req.params;
  const { session } = req;

  const order = await Order.findOne({ where: id });
  if (!order) {
    return res.status(400).json({
      status: "error",
      message: "order no found",
    });
  }

  if (order.userId !== session.id) {
    return res.status(400).json({
      status: "error",
      message: "access denied ",
    });
  }

  next();
};
module.exports = {
  checkOrder,
};
