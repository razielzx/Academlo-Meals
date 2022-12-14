const express = require("express");
const { protectSession } = require("../middlewares/auth.middleware");
const {
  createMeal,
  allMeals,
  mealById,
  updateMeal,
  deleteMeal,
} = require("../controllers/meal.controllers");
const { checkRole } = require("../middlewares/restaurant.middlewares");
const { createMealValidators } = require("../controllers/validations");

const mealRouter = express.Router();

mealRouter.post("/:id", createMealValidators, createMeal);
mealRouter.get("/", allMeals);

mealRouter.use(protectSession);

mealRouter.get("/:id", mealById);
mealRouter.patch("/:id", checkRole, updateMeal);
mealRouter.delete("/:id", checkRole, deleteMeal);

module.exports = {
  mealRouter,
};
