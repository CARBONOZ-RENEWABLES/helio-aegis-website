import mongoose, { Schema, Document } from 'mongoose';

// TeamMember Model
export interface ITeamMember extends Document {
  slug: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    title: string;
    department: 'leadership' | 'finance' | 'development' | 'operations' | 'advisory';
    bio: string;
    shortBio: string;
    email?: string;
    linkedinUrl?: string;
    order: number;
    featured: boolean;
  };
  media: {
    headshot: string;
    headshotAlt: string;
  };
  credentials: {
    yearsExperience?: number;
    previousCompanies: string[];
    education: Array<{
      degree: string;
      institution: string;
      year?: number;
    }>;
    certifications: string[];
  };
  status: 'active' | 'draft' | 'archived';
  lastEditedBy: string;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  slug: { type: String, required: true, unique: true },
  personalInfo: {
    firstName: String,
    lastName: String,
    title: String,
    department: { type: String, enum: ['leadership', 'finance', 'development', 'operations', 'advisory'] },
    bio: String,
    shortBio: String,
    email: String,
    linkedinUrl: String,
    order: Number,
    featured: Boolean
  },
  media: {
    headshot: String,
    headshotAlt: String
  },
  credentials: {
    yearsExperience: Number,
    previousCompanies: [String],
    education: [{
      degree: String,
      institution: String,
      year: Number
    }],
    certifications: [String]
  },
  status: { type: String, enum: ['active', 'draft', 'archived'], default: 'draft' },
  lastEditedBy: String,
  updatedAt: { type: Date, default: Date.now }
});

// Insight Model
export interface IInsight extends Document {
  slug: string;
  content: {
    title: string;
    subtitle?: string;
    body: string;
    excerpt: string;
    type: 'article' | 'report' | 'press-release' | 'video' | 'commentary';
    category: 'market' | 'policy' | 'technology' | 'company' | 'esg';
    tags: string[];
    readTimeMinutes?: number;
    reportPageCount?: number;
    videoUrl?: string;
    downloadUrl?: string;
    author: string;
    publishDate: Date;
    featured: boolean;
  };
  media: {
    coverImage: string;
    coverImageAlt: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
  analytics: {
    views: number;
    downloads: number;
  };
  status: 'draft' | 'published' | 'archived';
  lastEditedBy: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const InsightSchema = new Schema<IInsight>({
  slug: { type: String, required: true, unique: true },
  content: {
    title: String,
    subtitle: String,
    body: String,
    excerpt: String,
    type: { type: String, enum: ['article', 'report', 'press-release', 'video', 'commentary'] },
    category: { type: String, enum: ['market', 'policy', 'technology', 'company', 'esg'] },
    tags: [String],
    readTimeMinutes: Number,
    reportPageCount: Number,
    videoUrl: String,
    downloadUrl: String,
    author: String,
    publishDate: Date,
    featured: Boolean
  },
  media: {
    coverImage: String,
    coverImageAlt: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String
  },
  analytics: {
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 }
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  lastEditedBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: Date
});

// FAQ Model
export interface IFAQ extends Document {
  question: string;
  answer: string;
  highlightFact?: string;
  internalLink?: {
    label: string;
    href: string;
  };
  category: 'finance' | 'development' | 'investors' | 'esg' | 'process' | 'about';
  relatedFAQIds: string[];
  order: number;
  featured: boolean;
  analytics: {
    helpfulVotes: number;
    notHelpfulVotes: number;
    views: number;
  };
  status: 'draft' | 'published' | 'archived';
  lastEditedBy: string;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: String,
  highlightFact: String,
  internalLink: {
    label: String,
    href: String
  },
  category: { type: String, enum: ['finance', 'development', 'investors', 'esg', 'process', 'about'] },
  relatedFAQIds: [String],
  order: Number,
  featured: Boolean,
  analytics: {
    helpfulVotes: { type: Number, default: 0 },
    notHelpfulVotes: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  lastEditedBy: String,
  updatedAt: { type: Date, default: Date.now }
});

// Metric Model
export interface IMetric extends Document {
  key: string;
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  context?: string;
  iconName: string;
  order: number;
  showOn: ('homepage' | 'about' | 'investors')[];
  lastEditedBy: string;
  updatedAt: Date;
}

const MetricSchema = new Schema<IMetric>({
  key: { type: String, required: true, unique: true },
  label: String,
  value: String,
  prefix: String,
  suffix: String,
  context: String,
  iconName: String,
  order: Number,
  showOn: [String],
  lastEditedBy: String,
  updatedAt: { type: Date, default: Date.now }
});

// AuditLog Model
export interface IAuditLog extends Document {
  timestamp: Date;
  adminEmail: string;
  adminName: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'login' | 'logout';
  module: string;
  recordId?: string;
  recordLabel?: string;
  fieldChanged?: string;
  previousValue?: string;
  newValue?: string;
  ipAddress?: string;
}

const AuditLogSchema = new Schema<IAuditLog>({
  timestamp: { type: Date, default: Date.now },
  adminEmail: String,
  adminName: String,
  action: { type: String, enum: ['create', 'update', 'delete', 'publish', 'unpublish', 'login', 'logout'] },
  module: String,
  recordId: String,
  recordLabel: String,
  fieldChanged: String,
  previousValue: String,
  newValue: String,
  ipAddress: String
});

AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ adminEmail: 1 });

export const TeamMember = mongoose.models?.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
export const Insight = mongoose.models?.Insight || mongoose.model<IInsight>('Insight', InsightSchema);
export const FAQ = mongoose.models?.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema);
export const Metric = mongoose.models?.Metric || mongoose.model<IMetric>('Metric', MetricSchema);
export const AuditLog = mongoose.models?.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLog;
