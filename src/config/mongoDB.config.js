import mongoose from "mongoose";
import { MONGO_URL } from "./consts.config.js";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
