import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createRestaurantController } from "../controllers/restaurantController.js";

const router = express.Router();

// Create Restaurant || POST
router.post("/create", authMiddleware, createRestaurantController);

export default router;
