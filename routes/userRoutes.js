import express from "express";
import {
  getUserController,
  updatePassController,
  updateUserController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET USER || GET
router.get("/get-user", authMiddleware, getUserController);

// Update User Phone & Address || PUT
router.put("/update-user", authMiddleware, updateUserController);

// Update Password || PUT
router.put("/update-password", authMiddleware, updatePassController);

export default router;
