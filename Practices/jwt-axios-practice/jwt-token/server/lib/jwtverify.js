import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    req.user = decodedPayload;
    next();
  } catch (error) {
    // If token is expired, altered, or invalid, it lands here
    if (error.name === "TokenExpiredError") {
      // You can clear the invalid cookie if you want to be extra tidy
      res.clearCookie("token");
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }

    return res.status(401).json({ message: "Invalid token." });
  }
};
