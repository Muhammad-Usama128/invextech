import User from "../models/User.js";
import Task from "../models/Task.js";
import express from "express";
import { Router } from "express";
import { set } from "mongoose";

const router = Router();
let savedEmail = null;

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    savedEmail = user.email;
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const task = await Task.create({ email, tasks: [] });
    savedEmail = email;
    res.status(201).json({ message: "User created" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already in use" });
    }
    res.status(400).json({ error: err.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    if (!savedEmail) {
      return res.status(400).json({ error: "No user email found" });
    }
    const task = await Task.findOne({ email: savedEmail }).lean();
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task.tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!savedEmail) {
      return res.status(400).json({ error: "No user email found" });
    }
    const task = await Task.findOneAndUpdate(
      { email: savedEmail },
      { $push: { tasks: { title } } },
      { new: true },
    );
    res.status(201).json({ message: "Task added" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
