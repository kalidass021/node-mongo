import User from "../src/models/User.js";

export const signup = async (req, res, next) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error(`Error while signup ${err?.message ?? err}`);
    next(err);
  }
};
