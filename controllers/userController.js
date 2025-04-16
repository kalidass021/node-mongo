import User from '../src/models/User.js';

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

export const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error(`Error while fetching all users: ${err?.message ?? err}`);
    next(err);
  }
};

export const getSpecificUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const users = await User.find({ email }).select('-password');

    if (!users.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error(
      `Error while fetching the specific user data: ${err?.message} ?? err`
    );
  }
};
