import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// dot env configuration
dotenv.config();

const app = express();

// database connection initialized
connectDB();
// ==================== Using Middlewares
// client server communication
app.use(cors());
// to access json data from client
app.use(express.json());
// to check which url is hit, statusCode and TimeTaken
app.use(morgan("dev"));

// ==================== Importing Routes
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/food", foodRoutes);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is Running at PORT ${PORT}`.bgMagenta.white);
});
