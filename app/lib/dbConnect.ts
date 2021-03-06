import mongoose, { ConnectOptions } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongooseInst

if (!cached) {
  cached = global.mongooseInst = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    console.log(":: MONGOOSE - Re-using existing connection")
    return cached.conn
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log(":: MONGOOSE - Created new connection")
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect