import mongoose from 'mongoose';
import { demoHomepage, demoNavigation, demoCapabilities, demoMetrics } from './demo-data';

const MONGODB_URI = process.env.MONGODB_URI;
const DEMO_MODE = process.env.DEMO_MODE === 'true' || !MONGODB_URI;

if (!MONGODB_URI && !DEMO_MODE) {
  throw new Error(
    'Please define MONGODB_URI environment variable. ' +
    'Add it in Vercel Dashboard: Settings → Environment Variables. ' +
    'Or set DEMO_MODE=true for testing without database.'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Demo mode: skip database connection
  if (DEMO_MODE) {
    console.log('🎭 Running in DEMO MODE - No database required');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
export { DEMO_MODE };
