import mongoose from "mongoose";
import envsConfig from "./envs.config.js";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(envsConfig.MONGO_URL)
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
