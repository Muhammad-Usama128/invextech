import morgan from "morgan";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Task from "./models/Task.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const user = await User.find().lean();
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).populate("tasks").lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.create({ email, name, password, tasks: [] });
    res.status(200).json({ message: "User created Successfully" });
  } catch (err) {
    if (err.code === 11000) {
      console.log("Email already exist.");
    } else {
      console.log(err);
    }
  }
});

app.patch("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { password, name } = req.body;
    const user = await User.findOneAndUpdate({ email }, { password, name });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(201).json({ message: "User Updated Successfully" });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }
    if (user.tasks.length > 0) {
      await Promise.all(user.tasks.map((id) => Task.findByIdAndDelete(id)));
    }
    res.status(200).json({ message: "User deleted Successfully", user });
  } catch (err) {
    console.log(err);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).lean();
    if (!task) {
      res.status(404).json({ message: "Task Not Found." });
      return;
    }
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
  }
});

app.post("/tasks/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { title } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Email Not Found" });
      return;
    }
    const task = await Task.create({ title });
    user.tasks.push(task._id);
    await user.save();
    res.json({ message: "Task created Successfully", task });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(id, { status });
    if (!task) {
      res.status(404).json({ message: "Task Not Found" });
      return;
    }
    res.status(200).json({ message: "Task Updated Successfully" });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/users/:email/tasks/:id", async (req, res) => {
  try {
    const { email, id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({ message: "Task Not Found." });
      return;
    }
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { tasks: id } },
    );
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
