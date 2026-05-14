import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decodedPayload = jwt.verify(accessToken, JWT_SECRET);
    req.user = decodedPayload;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .clearCookie("accessToken")
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }
    return res.status(401).json({ message: "Invalid accessToken." });
  }
};
