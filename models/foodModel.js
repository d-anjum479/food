import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: { type: Number, required: [true, "Price is required"] },
    imageUrl: { type: String, default: "Dummy food image" },
    foodTags: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    foodCode: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Food = mongoose.model("Food", foodSchema);
