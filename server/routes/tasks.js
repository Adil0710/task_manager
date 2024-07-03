// routes/tasks.js
import express from 'express';
import { getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById,createSubTask, postTaskActivity, updateSubTask, deleteSubTask } from '../controllers/taskController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all tasks - Admin only
router.get('/', requireAuth, requireAdmin, getAllTasks);

// GET single task by ID - Authenticated users can view tasks assigned to them or if they are part of the team
router.get('/:taskId', requireAuth, getTaskById);

// POST create a new task - Admin only
router.post('/', requireAuth, requireAdmin, createTask);

// PUT update task by ID - Admin only
router.put('/:taskId', requireAuth, updateTaskById);

// DELETE task by ID - Admin only
router.delete('/:taskId', requireAuth, requireAdmin, deleteTaskById);

// DELETE delete a subtask under a task
router.delete('/:taskId/subtasks/:subTaskId', requireAuth, deleteSubTask);

// PUT update a subtask under a task
router.put('/:taskId/subtasks/:subTaskId', requireAuth, updateSubTask);

export default router;
