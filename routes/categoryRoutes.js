import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  getCategoryByTitleController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// Create category
router.post("/create", authMiddleware, createCategoryController);
// Get all categories
router.get("/all-categories", getAllCategoriesController);
// Get single category
router.get("/get-category/:id", getCategoryByIdController);
// Get single category by title
router.get("/get-category-title", getCategoryByTitleController);
// Update category by id
router.put("/update/:id", authMiddleware, updateCategoryController);
// delete category by id
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

export default router;
