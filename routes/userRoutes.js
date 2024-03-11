import express from "express";
import {
  deleteUserController,
  getUserController,
  resetPassController,
  updatePassController,
  updateUserController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET USER || GET
router.get("/get-user", authMiddleware, getUserController);

// Update User Phone & Address || PUT
router.put("/update-user", authMiddleware, updateUserController);

// Update User Password || PUT
router.put("/update-password", authMiddleware, updatePassController);
// Reset User Password || PUT
router.put("/reset-password", authMiddleware, resetPassController);
// Delete User || DELETE
router.delete("/delete-user/:id", authMiddleware, deleteUserController);

export default router;
