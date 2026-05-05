import mongoose from "mongoose";
import dns from "dns";
import { promisify } from "util";
let isConnected = false;
// Set fallback DNS servers (Google and Cloudflare public DNS)
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1"]);

const connectDB = async () => {
  if (isConnected) {
    console.log("✓ MongoDB already connected");
    return;
  }
  isConnected = true;
  const mongoURI = process.env.MONGODB_URI;
  const fallbackURI = process.env.MONGODB_FALLBACK_URI; // Optional fallback connection string
  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds

  console.log("Attempting MongoDB connection...");

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Connection attempt ${attempt}/${maxRetries}`);
      console.log("Using DNS servers: 8.8.8.8, 8.8.4.4, 1.1.1.1, 1.0.0.1");

      const conn = await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      console.log(`✓ MongoDB connected successfully`);
      return;
    } catch (err) {
      console.error(`✗ Attempt ${attempt} failed: ${err.message}`);

      // Try fallback URI if primary fails on last attempt
      if (attempt === maxRetries && fallbackURI) {
        try {
          console.log("Attempting fallback connection...");
          const conn = await mongoose.connect(fallbackURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
          });
          console.log(
            `✓ MongoDB connected via fallback: ${conn.connection.host}`,
          );
          return;
        } catch (fallbackErr) {
          console.error(`✗ Fallback connection failed: ${fallbackErr.message}`);
          process.exit(1);
        }
      }

      // Wait before retrying
      if (attempt < maxRetries) {
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }
};

const disconnectDB = async () => {
  if (!isConnected) {
    console.log("MongoDB already disconnected");
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("MongoDB disconnection error:", error.message);
  }
};

export { connectDB, disconnectDB };
