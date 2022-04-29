import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    comment: { type: String, required: true },
    rate: { type: Number, min: 1, max: 5, required: true },
    productId: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

export default model("reviews", reviewSchema);
