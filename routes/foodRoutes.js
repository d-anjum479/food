import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createFoodController,
  deleteFoodController,
  getAllFoodsController,
  getSingleFoodController,
  updateFoodController,
} from "../controllers/foodController.js";

const router = express.Router();

router.post("/create", authMiddleware, createFoodController);
router.get("/all-foods", getAllFoodsController);
router.get("/get-food/:id", getSingleFoodController);
router.put("/update/:id", authMiddleware, updateFoodController);
router.delete("/delete/:id", authMiddleware, deleteFoodController);

export default router;
