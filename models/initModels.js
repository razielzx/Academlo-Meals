const { Order } = require("./order.model");
const { User } = require("./user.model");
const { Restaurant } = require("./restaurant.model");
const { Meal } = require("./meal.model");
const { Review } = require("./review.model");

const initModels = () => {
  // 1 - 1

  Meal.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meal);

  // 1 - M

  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);

  Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Restaurant);



  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);
};
module.exports = {
  initModels,
};
