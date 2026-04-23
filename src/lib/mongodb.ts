import mongoose from "mongoose";

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL;
  if (!mongoUri) {
    throw new Error("MongoDB connection string is not defined");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      if (message.toLowerCase().includes("bad auth")) {
        throw new Error("Invalid MongoDB credentials. Check your MONGODB_URI in .env.local.");
      }
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
