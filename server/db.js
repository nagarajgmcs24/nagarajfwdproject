import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return mongoose.connection;
  }

  if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI is not defined in .env");
  }

  try {
    const connection = await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

export function getDB() {
  return mongoose.connection;
}
