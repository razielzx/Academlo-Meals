const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { restaurantRouter } = require("./routes/restaurant.routes");
const { mealRouter } = require("./routes/meal.routes");
const { orderRouter } = require("./routes/order.routes");

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/meal", mealRouter);
app.use("/api/v1/order", orderRouter);

app.all('*', (req, res) => {
  res.status(404).json({
      status: 'error',
      message: `${req.method} ${req.url} does not exists in our server`,
  })
})

module.exports = {
  app,
};
