import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(`${process.env.MONGO_URI}/food`);
    console.log(`DB Connected to ${res.connection.host}`.bgBlue);
  } catch (error) {
    console.log(`DB Connection Error - ${error}`);
  }
};

export { connectDB };
