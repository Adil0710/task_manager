import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.Authorization;
    if (!token) {
      console.log('No token found');
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (Date.now() >= decoded.exp * 1000) {
      console.log('Token expired');
      return res.sendStatus(401);
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      console.log('User not found');
      return res.sendStatus(401);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Authentication error:', error);
    res.sendStatus(401);
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};
