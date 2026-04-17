import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from './mongodb';
import User from '@/models/User';

let initialized = false;

export async function initializeApp() {
  if (initialized) return;

  try {
    await dbConnect();

    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@helioaegis.com';
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Admin123!ChangeMe';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
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
        createdBy: 'system'
      });

      console.log('✅ Admin user created');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    }

    initialized = true;
  } catch (error) {
    console.error('❌ Initialization error:', error);
  }
}
