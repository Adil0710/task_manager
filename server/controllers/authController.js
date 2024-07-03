import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User not found. Please check your email address or signup." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid password. Please try again." });
    }

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
    const sameSite = process.env.NODE_ENV === 'production' ? 'none' : 'lax';

    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: sameSite,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ user: user.name, msg: "Logged in successfully" });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(400).json({ msg: "An error occurred while logging in. Please try again later." });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(400).json({ msg: "An error occurred while logging out. Please try again later." });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.error('Error during checkAuth:', error);
    res.sendStatus(400);
  }
};
