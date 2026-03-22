import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  profileImage?: string;
  order: number;
  status: 'draft' | 'published';
  lastEditedBy: string;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  expertise: { type: [String], default: [] },
  profileImage: { type: String, default: '' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  lastEditedBy: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

// Delete the model if it exists to avoid caching issues
if (mongoose.models?.TeamMember) {
  delete mongoose.models.TeamMember;
}

const TeamMember = mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);

export default TeamMember;
