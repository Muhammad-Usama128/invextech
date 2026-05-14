import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import jwt from "jsonwebtoken";
import RefreshToken from "./models/RefreshToken.js";
import { verifyToken } from "./lib/jwtverify.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Connect To MongoDB
connectDB();

// Routes
app.get("/", verifyToken, (req, res) => {
  res.send("Hello World!");
});

app.get("/check-auth", verifyToken, (req, res) => {
  return res.status(200).json({ message: "Authorized" });
});

app.post("/login", async (req, res) => {
  try {
    // Generate Access Token
    const accessToken = jwt.sign(
      { id: 1, name: "Usama" },
      process.env.SECRET_KEY,
      {
        expiresIn: "1m",
      },
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      { id: 1, name: "Usama" },
      process.env.SECRET_KEY,
      {
        expiresIn: "5m",
      },
    );

    // Add Refresh Token To Database
    const refreshTokenDB = await RefreshToken.create({
      token: refreshToken,
    });

    // Set Cookie
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 1000, // 1 minutes in milliseconds
        path: "/",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 5 * 60 * 1000, // 5 minutes in milliseconds
        path: "/refresh",
      })
      .status(200)
      .json({ message: "Login Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token is not valid" });
  }
  try {
    // Check if the refresh token is valid in the database
    const isRefreshTokenValid = await RefreshToken.findOne({
      token: refreshToken,
    });

    if (!isRefreshTokenValid) {
      return res.status(403).json({ message: "Refresh token is not valid" });
    }

    // Verify token signature and expiration
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);

    const newAccessToken = jwt.sign(
      { id: decoded.id, name: decoded.name },
      process.env.SECRET_KEY,
      { expiresIn: "1m" },
    );
    
    return res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({ message: "Access token refreshed successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .clearCookie("accessToken", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        })
        .clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/refresh",
        })
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }
    return res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/refresh",
      })
      .status(403)
      .json({ message: "Invalid refreshToken." });
  }
});
app.post("/refresh/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh token is not valid" });
    }
    const isRefreshTokenValid = await RefreshToken.findOneAndDelete({
      token: refreshToken,
    });

    if (!isRefreshTokenValid) {
      return res.status(403).json({ message: "Refresh token is not valid" });
    }
    return res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/refresh",
      })
      .status(200)
      .json({ message: "Logout successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .clearCookie("accessToken", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        })
        .clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/refresh",
        })
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }
    return res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/refresh",
      })
      .status(403)
      .json({ message: "Invalid refreshToken." });
  }
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
