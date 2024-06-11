const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        isCompleted: req.body.isCompleted,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.title = req.body.title;
        task.isCompleted = req.body.isCompleted;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndDelete(taskId);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};

