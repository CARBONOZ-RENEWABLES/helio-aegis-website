import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  role: 'super_admin' | 'editor' | 'viewer';
  hashedPassword: string;
  avatar?: string;
  permissions: {
    canPublish: boolean;
    canDeleteContent: boolean;
    canManageUsers: boolean;
    canViewAnalytics: boolean;
    editableModules: string[];
  };
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
}

const UserSchema = new Schema<IUser>({
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

const User = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema);

export default User;
