const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

// Get all tasks
router.get('/tasks', taskController.getAllTasks);

// Create a task
router.post('/tasks', taskController.createTask);

// Update a task
router.put('/tasks/:id', taskController.updateTask);

// Delete a task
router.delete('/tasks/:id', taskController.deleteTask);

// Search tasks by name
router.get('/tasks/search', taskController.searchTasks);

module.exports = router;
