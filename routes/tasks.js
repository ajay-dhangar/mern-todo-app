const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Make sure the path is correct

// Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the task.' });
  }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks.' });
  }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the task.' });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndRemove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the task.' });
  }
});

module.exports = router;
