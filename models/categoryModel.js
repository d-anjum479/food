import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
      lowercase: true,
      index: true,
    },
    imageUrl: {
      type: String,
      default: "Dummy Image",
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
