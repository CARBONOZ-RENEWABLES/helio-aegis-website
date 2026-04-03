const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://localhost:27017/helio-aegis';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['super_admin', 'editor', 'viewer'], required: true },
  hashedPassword: { type: String, required: true, select: false },
  avatar: String,
  permissions: {
    canPublish: { type: Boolean, default: false },
    canDeleteContent: { type: Boolean, default: false },
    canManageUsers: { type: Boolean, default: false },
    canViewAnalytics: { type: Boolean, default: false },
    editableModules: [String]
  },
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: String
});

const User = mongoose.models?.User || mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@helioaegis.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      await mongoose.connection.close();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('Admin123!ChangeMe', 10);

    // Create admin user
    await User.create({
      email: 'admin@helioaegis.com',
      name: 'Admin User',
      role: 'super_admin',
      hashedPassword: hashedPassword,
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

    console.log('Admin user created successfully!');
    console.log('Email: admin@helioaegis.com');
    console.log('Password: Admin123!ChangeMe');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
}

seedAdmin();
