import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
