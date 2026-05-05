import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Discs from "./models/Disc.js";
import User from "./models/User.js";
import Order from "./models/Order.js";
import { sendOTP } from "./util/OTP.js";
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/discs", async (req, res) => {
  try {
    const discs = await Discs.find();
    res.json(discs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/:number", async (req, res) => {
  const { number } = req.params;
  console.log(number);
  try {
    const user = await User.findOne({ number: number });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/user", async (req, res) => {
  const { number, name } = req.body;
  console.log(number, name);
  try {
    const user = await User.create({
      number,
      name,
      dateOfBirth: "",
      orders: [],
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, dateOfBirth } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.name = name;
    user.dateOfBirth = dateOfBirth;
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .populate("orders")
      .sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/order/:id", async (req, res) => {
  const { id } = req.params;
  const { dishes, price } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const order = await Order.create({
      dishes,
      price,
    });
    user.orders.unshift(order._id);
    await user.save();
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/otp/:number", async (req, res) => {
  const { number } = req.params;
  const otp = "111111" || (await sendOTP(number));
  res.json({ otp });
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
