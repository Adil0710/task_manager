// controllers/projectController.js
import Project from '../models/Project.js';

// GET all projects - Admin only
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('team manager');
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET single project by ID
const getProjectById = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId).populate('team manager');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user is part of the project's team or if the user is admin
    const isTeamMember = project.team.some(member => member._id.equals(req.user._id));
    if (!isTeamMember && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You do not have permission to view this project' });
    }

    res.json(project);
  } catch (err) {
    console.error('Error fetching project by ID:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST create a new project - Admin only
const createProject = async (req, res) => {
  const { title, description, manager, team, tasks, notices, isArchived } = req.body;
  try {
    const newProject = new Project({ title, description, manager, team, tasks, notices, isArchived });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// PUT update project by ID
const updateProjectById = async (req, res) => {
  const projectId = req.params.projectId;
  const { title, description, manager, team, tasks, notices, isArchived } = req.body;
  try {
    const project = await Project.findById(projectId).populate('team manager');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user is part of the project's team or if the user is admin
    const isTeamMember = project.team.some(member => member._id.equals(req.user._id));
    if (!isTeamMember && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You do not have permission to update this project' });
    }

    project.title = title;
    project.description = description;
    project.manager = manager;
    project.team = team;
    project.tasks = tasks;
    project.notices = notices;
    project.isArchived = isArchived;
    await project.save();
    res.json(project);
  } catch (err) {
    console.error('Error updating project by ID:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE project by ID - Admin only
const deleteProjectById = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project by ID:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById
};
