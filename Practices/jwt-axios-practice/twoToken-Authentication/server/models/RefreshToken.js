import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "5m", // Tells MongoDB: Delete 5 Mins after the createdAt date
  },
});

export default mongoose.models.RefreshToken ||
  mongoose.model("RefreshToken", refreshTokenSchema);
