const checkUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { session } = req;

    if (session.id !== Number(id)) {
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
  checkUser,
};
