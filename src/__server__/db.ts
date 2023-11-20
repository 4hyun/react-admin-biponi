import mongoose from "mongoose";

async function connectDB() {
  const MONGODB_URI = process.env.MONGO_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  // @ts-ignore
  let cached = global["mongoose"];

  if (!cached) {
    // @ts-ignore
    cached = global["mongoose"] = { conn: null, promise: null };
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("Database connected successfully");
  return cached.conn;
}

export default connectDB;
