import morgan from "morgan";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import userRoutes from "./routes/users.js";

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
app.use("/", userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// setTimeout(() => {
//   disconnectDB();
// }, 6000);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
