import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    if (req.user._id.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({ msg: "Access denied" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ msg: "Server error" });
  }
};


// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, title, role, email, password, isAdmin } = req.body;

    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered. Please use a different email or login." });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a new user
    const newUser = await User.create({ name, title, role, email, password: hashedPassword, isAdmin });


    // Respond with success message
    res.status(200).json({newUser, msg: `${name} registered successfully.` });
  } catch (error) {
    console.error('Error during signup:', error);
    // Respond with error message
    res.status(400).json({ msg: "An error occurred while signing up. Please try again later." });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  const userId = req.params.userId;
  const { name, email, isAdmin } = req.body;
  try {
    if (req.user._id.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({ msg: "Access denied" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    // Only allow admin to update isAdmin field
    if (req.user.isAdmin && isAdmin !== undefined) user.isAdmin = isAdmin;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ msg: "Server error" });
  }
};


// Delete user by ID
export const deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
