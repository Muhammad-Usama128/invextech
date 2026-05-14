import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    dishes: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
