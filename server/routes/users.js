import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} from '../controllers/usersController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, requireAdmin, getAllUsers);
router.get('/:userId', requireAuth, getUserById);
router.post('/', requireAuth, requireAdmin, createUser);
router.put('/:userId', requireAuth, updateUserById);
router.delete('/:userId', requireAuth, requireAdmin, deleteUserById);

export default router;
