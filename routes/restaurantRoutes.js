import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createRestaurantController,
  deleteRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
} from "../controllers/restaurantController.js";

const router = express.Router();

// Create Restaurant || POST
router.post("/create", authMiddleware, createRestaurantController);

// Get all restaurant to display on frontend
router.get("/all-restaurants", getAllRestaurantController);
// Get single restaurant
router.get("/get-restaurant/:id", getRestaurantByIdController);
// Delete Restaurant
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

export default router;
