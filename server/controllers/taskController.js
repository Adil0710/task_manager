import Task from '../models/Task.js';
import Notice from '../models/Notice.js';

// GET all tasks - Admin only
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('team');
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET single task by ID
const getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findById(taskId).populate('team');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the user is part of the task's team or if the user is admin
    const isTeamMember = task.team.some(member => member._id.equals(req.user._id));
    if (!isTeamMember && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You do not have permission to view this task' });
    }

    res.json(task);
  } catch (err) {
    console.error('Error fetching task by ID:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST create a new task - Admin only
const createTask = async (req, res) => {
  const { title, date, project, priority, stage, assets, team, isTrashed } = req.body;
  try {
    const newTask = new Task({ title, date, project, priority, stage, assets, team, isTrashed });
    await newTask.save();

    // Create activity for task creation
    const activity = {
      type: 'created',
      activity: `New task "${title}" has been created`,
      by: req.user._id,
    };
    newTask.activities.push(activity);
    await newTask.save();

    // Prepare notification text for task creation
    let text = `New task "${title}" has been assigned to you`;
    if (team?.length > 1) {
      text += ` and ${team.length - 1} others.`;
    }
    text += ` The task priority is set to ${priority}, so check and act accordingly. The task date is ${new Date(date).toDateString()}. Thank you!!!`;

    // Create notification for task creation
    await Notice.create({
      team,
      text,
      task: newTask._id,
    });

    res.status(201).json({ status: true, task: newTask, message: 'Task created successfully.' });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ status: false, message: 'Server Error' });
  }
};

// PUT update task by ID
const updateTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, date, project, priority, stage, assets, team, isTrashed } = req.body;
  try {
    const task = await Task.findById(taskId).populate('team');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the user is part of the task's team or if the user is admin
    const isTeamMember = task.team.some(member => member._id.equals(req.user._id));
    if (!isTeamMember && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You do not have permission to update this task' });
    }

    // Update task fields
    task.title = title;
    task.date = date;
    task.project = project;
    task.priority = priority;
    task.stage = stage;
    task.assets = assets;
    task.team = team;
    task.isTrashed = isTrashed;

    // Create activity for task update
    const activity = {
      type: 'updated',
      activity: `Task "${title}" has been updated`,
      by: req.user._id,
    };
    task.activities.push(activity);
    await task.save();

    // Prepare notification text for task update
    let text = `Task "${title}" has been assigned to you`;
    if (team?.length > 1) {
      text += ` and ${team.length - 1} others.`;
    }
    text += ` The task priority is set to ${priority}, so check and act accordingly. The task date is ${new Date(date).toDateString()}. Thank you!!!`;

    // Create notification for task update
    await Notice.create({
      team,
      text,
      task: task._id,
    });

    res.json({ status: true, task, message: 'Task updated successfully.' });
  } catch (err) {
    console.error('Error updating task by ID:', err);
    res.status(500).json({ status: false, message: 'Server Error' });
  }
};

// DELETE task by ID - Admin only
const deleteTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Delete task
    await task.deleteOne();

    // Create activity for task deletion
    const activity = {
      type: 'deleted',
      activity: `Task "${task.title}" has been deleted`,
      by: req.user._id,
    };
    task.activities.push(activity);
    await task.save();

    // Prepare notification text for task deletion
    const text = `Task "${task.title}" has been deleted`;

    // Create notification for task deletion
    await Notice.create({
      team: task.team,
      text,
      task: task._id,
    });

    res.json({ status: true, message: 'Task deleted successfully.' });
  } catch (err) {
    console.error('Error deleting task by ID:', err);
    res.status(500).json({ status: false, message: 'Server Error' });
  }
};

// POST create task activity
const postTaskActivity = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { type, activity } = req.body;
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const data = {
      type,
      activity,
      by: userId,
    };

    task.activities.push(data);
    await task.save();

    res.status(200).json({ status: true, message: 'Activity posted successfully.' });
  } catch (err) {
    console.error('Error posting activity:', err);
    res.status(500).json({ status: false, message: 'Server Error' });
  }
};

// POST create subtask for a task
const createSubTask = async (req, res) => {
  const { id } = req.params;
  const { title, date, tag } = req.body;
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const newSubTask = {
      title,
      date,
      tag,
    };

    task.subTasks.push(newSubTask);
    await task.save();

    res.status(200).json({ status: true, message: 'Subtask added successfully.' });
  } catch (err) {
    console.error('Error creating subtask:', err);
    res.status(500).json({ status: false, message: 'Server Error' });
  }
};
// controllers/taskController.js

export const updateSubTask = async (req, res) => {
    try {
      const { taskId, subTaskId } = req.params;
      const { title, tag, date } = req.body;
  
      const task = await Task.findById(taskId);
  
      // Find the subtask by its ID
      const subTask = task.subTasks.id(subTaskId);
      if (!subTask) {
        return res.status(404).json({ status: false, message: 'Subtask not found.' });
      }
  
      // Update subtask fields
      subTask.title = title;
      subTask.tag = tag;
      subTask.date = date;
  
      await task.save();
  
      res.status(200).json({ status: true, message: 'Subtask updated successfully.', subTask });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };

  // controllers/taskController.js

export const deleteSubTask = async (req, res) => {
    try {
      const { taskId, subTaskId } = req.params;
  
      const task = await Task.findById(taskId);
  
      // Find the subtask by its ID and remove it
      task.subTasks.id(subTaskId).remove();
  
      await task.save();
  
      res.status(200).json({ status: true, message: 'Subtask deleted successfully.' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };
  

export {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  postTaskActivity,
  createSubTask
};
