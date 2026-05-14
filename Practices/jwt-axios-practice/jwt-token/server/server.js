import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./lib/jwtverify.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Serve frontend static files
app.use("/client", express.static(path.join(__dirname, "../client")));

app.get("/", verifyToken, (req, res) => {
  return res.json({ message: "Hello World" });
});

app.post("/login", async (req, res) => {
  try {
    const token = jwt.sign({ id: 1, name: "Usama" }, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 1000,
      })
      .json({
        message: `Token Given`,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/check-auth", verifyToken, (req, res) => {
  return res.json({ message: "You are authorized" });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
