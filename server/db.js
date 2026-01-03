import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fix-my-ward";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export function getDB() {
  return mongoose.connection;
}
