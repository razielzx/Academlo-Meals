const { Review } = require("../models/review.model");

const checkRole = async (req, res, next) => {
  try {
    const { session } = req;

    if (session.role !== "admin") {
      return res
        .status(400)
        .json({ status: "error", messages: "access denied" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
const checkUserReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { session } = req;
    const review = await Review.findOne({ where: { id } });

    if (session.id !== review.userId) {
      return res
        .status(400)
        .json({ status: "error", messages: "access denied" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  checkRole,
  checkUserReview,
};
