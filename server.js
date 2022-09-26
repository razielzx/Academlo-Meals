const { app } = require("./app");
const { db } = require("./utils/database.util");
const { initModels } = require("./models/initModels");
const dotenv = require("dotenv");

dotenv.config(".env");

const serverStart = async () => {
  try {
    await db.authenticate();

    initModels();

    await db.sync();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log("running server in port " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
serverStart();
