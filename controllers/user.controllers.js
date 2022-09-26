const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models/user.model");
const { Order } = require("../models/order.model");
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");
dotenv.config(".env");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const allUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      where: { status: "active" },
      include: [{ model: Order }],
    });

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      where: { email, status: "active" },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: "error",
        message: "credential invalid",
      });
    }

    // Remove password from response
    user.password = undefined;

    const token = jwt.sign({ id: user.id }, process.env.KEY, {
      expiresIn: "30d",
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { session } = req;
    const { email, name } = req.body;

    await session.update({ email, name });

    res.status(200).json({
      status: "success",
      data: {
        session,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { session } = req;

    await session.update({ status: "deleted" });

    res.status(200).json({
      status: "success",
      data: {
        session,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const allOrders = async (req, res) => {
  try {
    const { id } = req.session;

    const orders = await Order.findAll({
      where: { userId: id },
      include: { model: Meal, include: { model: Restaurant } },
    });

    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const orderById = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.findOne({ where: { id } });

    if (!orders) {
      return res.status(200).json({
        status: "success",
        message: "order no found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  allUser,
  login,
  updateUser,
  deleteUser,
  allOrders,
  orderById,
};
