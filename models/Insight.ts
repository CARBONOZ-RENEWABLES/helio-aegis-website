import mongoose, { Schema, Document } from 'mongoose';

export interface IInsight extends Document {
  slug: string;
  type: 'Research' | 'Commentary' | 'Report';
  category: 'Market Analysis' | 'Policy' | 'Technology' | 'Regional';
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  authorRole: string;
  readTime: string;
  featured: boolean;
  keyTakeaways: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  lastEditedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const InsightSchema = new Schema<IInsight>({
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Research', 'Commentary', 'Report'], required: true },
  category: { type: String, enum: ['Market Analysis', 'Policy', 'Technology', 'Regional'], required: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String, default: '' },
  author: { type: String, default: '' },
  authorRole: { type: String, default: '' },
  readTime: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  keyTakeaways: { type: [String], default: [] },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  publishedAt: Date,
  lastEditedBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

InsightSchema.index({ slug: 1 });
InsightSchema.index({ status: 1 });
InsightSchema.index({ type: 1 });
InsightSchema.index({ category: 1 });

const Insight = mongoose.models?.Insight || mongoose.model<IInsight>('Insight', InsightSchema);

export default Insight;
