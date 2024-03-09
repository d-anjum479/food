import express from "express";
import { registerController } from "../controllers/authController.js";

const router = express.Router();

// Routes
// Register || POST

router.post("/register", registerController);
export default router;
