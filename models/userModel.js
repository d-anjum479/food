import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    userType: {
      type: String,
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default: "dummyImage",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
