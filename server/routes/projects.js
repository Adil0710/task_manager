// routes/projects.js
import express from 'express';
import { getAllProjects, getProjectById, createProject, updateProjectById, deleteProjectById } from '../controllers/projectController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all projects - Admin only
router.get('/', requireAuth, requireAdmin, getAllProjects);

// GET single project by ID - Authenticated users can view projects they are part of or if they are admins
router.get('/:projectId', requireAuth, getProjectById);

// POST create a new project - Admin only
router.post('/', requireAuth, requireAdmin, createProject);

// PUT update project by ID - Authenticated users can update projects they are part of or if they are admins
router.put('/:projectId', requireAuth, updateProjectById);

// DELETE project by ID - Admin only
router.delete('/:projectId', requireAuth, requireAdmin, deleteProjectById);

export default router;
