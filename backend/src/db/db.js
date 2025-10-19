import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {

  try {
    console.log(MONGO_URI)
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
