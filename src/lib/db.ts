import mongoose, { ConnectOptions } from "mongoose";

/**
 * Global Mongoose connection cache interface for Next.js Serverless environments.
 * In development, hot-reloading can cause multiple database connections to be initialized.
 * Caching the connection on `globalThis` prevents connection leaks across module reloads.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Retrieve or initialize global mongoose cache singleton
const cached: MongooseCache = globalThis.mongooseCache || { conn: null, promise: null };

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

/**
 * Connects to MongoDB Atlas using Mongoose with connection pooling and caching.
 *
 * @returns {Promise<typeof mongoose>} Active Mongoose instance
 * @throws {Error} If `MONGODB_URI` is not configured in environment variables
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error(
      "Critical Configuration Error: 'MONGODB_URI' environment variable is missing. " +
        "Please ensure it is defined in '.env.local' or your deployment provider's environment settings."
    );
  }

  // 1. Return cached connection if active
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // 2. Create connection promise if non-existent or previously failed
  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      dbName: "accredian_enterprise",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(mongodbUri, opts)
      .then((mongooseInstance) => {
        if (process.env.NODE_ENV !== "production") {
          console.log("[Database] Successfully connected to MongoDB Atlas ('accredian_enterprise')");
        }
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("[Database] Connection attempt failed:", error);
        cached.promise = null; // Reset promise on error to allow retries
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
