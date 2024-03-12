import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Restaurant name required"] },
    image: { type: String },
    foods: { type: Array },
    time: { type: String },
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: true },
    logo: { type: String },
    rating: { type: Number, default: 1, min: 1, max: 5 },
    ratingCount: { type: String },
    code: { Type: String },
    coordinates: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
