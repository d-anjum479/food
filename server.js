import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// dot env configuration
dotenv.config();

const app = express();

// Middlewares
// client server communication
app.use(cors());
// to access json data from client
app.use(express.json());
// to check which url is hit, statusCode and TimeTaken
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is Running at PORT ${PORT}`.bgMagenta.white);
});
