const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://localhost:27017/helio-aegis';

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  role: String,
  hashedPassword: { type: String, select: false },
  permissions: Object,
  isActive: Boolean,
  createdBy: String
});

const User = mongoose.model('User', userSchema);

async function resetAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('Admin123!ChangeMe', 10);
    
    const result = await User.updateOne(
      { email: 'admin@helioaegis.com' },
      { 
        $set: { 
          hashedPassword: hashedPassword,
          isActive: true 
        } 
      }
    );

    console.log('Admin password reset!');
    console.log('Email: admin@helioaegis.com');
    console.log('Password: Admin123!ChangeMe');
    console.log('Updated:', result.modifiedCount, 'user(s)');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetAdmin();
