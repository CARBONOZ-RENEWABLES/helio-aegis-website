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

async function resetPassword() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const newPassword = 'Admin@2024!Change';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await User.updateOne(
      { email: 'admin@helioaegis.com' },
      { hashedPassword: hashedPassword }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Admin password reset successfully!');
      console.log('Email: admin@helioaegis.com');
      console.log('Password: Admin@2024!Change');
    } else {
      console.log('❌ Admin user not found');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error resetting password:', error);
    process.exit(1);
  }
}

resetPassword();
