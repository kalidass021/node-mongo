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
    if (!users.length) {
      return res.status(404).json({ message: 'No users found' });
    }
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
      `Error while fetching the specific user data: ${err?.message} ?? ${err}`
    );
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ message: 'User Id is required for update operation' });
    }

    const update = req.body;
    if (!update) {
      return res
        .status(400)
        .json({ message: 'Please provide details that needs to be updated' });
    }
    // by default findByIdAndUpdate method returns the document before updation
    // if we want the document after the updation done, we need pass returnDocument: 'after'
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      returnDocument: 'after',
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(
      `Error while updating the user data ${err?.message} ?? ${err}`
    );
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ message: 'User Id is required for delete operation' });
    }

    // await User.findByIdAndDelete({_id: userId});
    // or
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User removed', deletedUser: user });
  } catch (err) {
    console.error(`Error while user deletion: ${err?.message} ?? ${err}`);
    next(err);
  }
};
