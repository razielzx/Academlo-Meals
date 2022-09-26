const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsMessages = errors.array().map((error) => error.msg);

    const messages = errorsMessages.join(". ");

    return res.status(400).json({
      status: "error",
      messages,
    });
  }
  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email").isEmail().withMessage("Must provide a valid email"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("role").notEmpty().withMessage("role cannot be empty"),

  checkValidations,
];

const createRestaurantValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("address")
    .isString()
    .withMessage("address must be a string")
    .notEmpty()
    .withMessage("address cannot be empty"),
  body("rating").notEmpty().withMessage("rating cannot be empty"),

  checkValidations,
];

const createMealValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("price").notEmpty().withMessage("price cannot be empty"),

  checkValidations,
];

module.exports = {
  createUserValidators,
  createRestaurantValidators,
  createMealValidators,
};
