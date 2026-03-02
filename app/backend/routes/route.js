import express from 'express'
import Task from "../models/task.js"

const taskRoutes = express.Router()

/* CREATE */
taskRoutes.post("/", async (req, res) => {
  try {
    const { task } = req.body;

    const newTask = await Task.create({ task });

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

/* READ */
taskRoutes.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

/* UPDATE */
taskRoutes.put("/:id", async (req, res) => {
  try {
    const updateData = {};

    if (req.body.task !== undefined) {
      updateData.task = req.body.task;
    }

    if (req.body.status !== undefined) {
      updateData.status = req.body.status;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: 'after' }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

/* DELETE */
taskRoutes.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ status: "deleted" });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

export default taskRoutes;
