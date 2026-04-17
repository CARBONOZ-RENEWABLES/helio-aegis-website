import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

let cached = global.mongoose;
let adminSeeded = false;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define MONGODB_URI environment variable. ' +
      'Add it in Vercel Dashboard: Settings → Environment Variables.'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    
    if (!adminSeeded) {
      await seedAdmin();
      adminSeeded = true;
    }
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

async function seedAdmin() {
  try {
    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
      email: String,
      name: String,
      role: String,
      hashedPassword: String,
      permissions: Object,
      isActive: Boolean,
      createdBy: String,
      createdAt: Date
    }));

    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@helioaegis.com';
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Admin123!ChangeMe';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      await User.updateOne(
        { email: adminEmail },
        { 
          $set: { 
            hashedPassword,
            isActive: true,
            permissions: {
              canPublish: true,
              canDeleteContent: true,
              canManageUsers: true,
              canViewAnalytics: true,
              editableModules: ['all']
            }
          } 
        }
      );
      
      console.log('🔄 Admin credentials updated from environment');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await User.create({
        email: adminEmail,
        name: 'Admin User',
        role: 'super_admin',
        hashedPassword,
        permissions: {
          canPublish: true,
          canDeleteContent: true,
          canManageUsers: true,
          canViewAnalytics: true,
          editableModules: ['all']
        },
        isActive: true,
        createdBy: 'system',
        createdAt: new Date()
      });

      console.log('✅ Admin user created automatically');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    }
  } catch (error) {
    console.error('⚠️ Admin seed error:', error);
  }
}

export default dbConnect;
