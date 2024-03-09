import express from "express";
import { getUserController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET USER || GET
router.get("/get-user", authMiddleware, getUserController);

export default router;
