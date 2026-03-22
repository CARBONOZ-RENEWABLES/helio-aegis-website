import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  slug: string;
  basicInfo: {
    name: string;
    shortDescription: string;
    fullDescription: string;
    status: 'operational' | 'construction' | 'development' | 'pipeline';
    technology: 'solar' | 'wind' | 'storage' | 'hydrogen' | 'hybrid';
    capacityMW: number;
    location: {
      city: string;
      country: string;
      region: 'americas' | 'emea' | 'apac';
      latitude: number;
      longitude: number;
    };
    codDate: string;
    featured: boolean;
    order: number;
  };
  media: {
    heroImage: string;
    galleryImages: string[];
    altText: string;
  };
  technicalSpecs: {
    annualGenerationMWh?: number;
    co2AvoidedTonnes?: number;
    homesPowered?: number;
    panelType?: string;
    inverterType?: string;
    storageCapacityMWh?: number;
    additionalSpecs: Array<{ label: string; value: string }>;
  };
  financialHighlights: {
    totalProjectCost?: string;
    debtProvider?: string;
    equityPartners?: string;
    ppaTerm?: string;
    offtaker?: string;
    additionalDetails: Array<{ label: string; value: string }>;
  };
  timeline: Array<{
    milestone: string;
    date: string;
    completed: boolean;
    order: number;
  }>;
  teamInvolved: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
  status: 'draft' | 'published' | 'archived';
  lastEditedBy: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const ProjectSchema = new Schema<IProject>({
  slug: { type: String, required: true, unique: true },
  basicInfo: {
    name: { type: String, required: true },
    shortDescription: String,
    fullDescription: String,
    status: { type: String, enum: ['operational', 'construction', 'development', 'pipeline'] },
    technology: { type: String, enum: ['solar', 'wind', 'storage', 'hydrogen', 'hybrid'] },
    capacityMW: Number,
    location: {
      city: String,
      country: String,
      region: { type: String, enum: ['americas', 'emea', 'apac'] },
      latitude: Number,
      longitude: Number
    },
    codDate: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  media: {
    heroImage: String,
    galleryImages: [String],
    altText: String
  },
  technicalSpecs: {
    annualGenerationMWh: Number,
    co2AvoidedTonnes: Number,
    homesPowered: Number,
    panelType: String,
    inverterType: String,
    storageCapacityMWh: Number,
    additionalSpecs: [{ label: String, value: String }]
  },
  financialHighlights: {
    totalProjectCost: String,
    debtProvider: String,
    equityPartners: String,
    ppaTerm: String,
    offtaker: String,
    additionalDetails: [{ label: String, value: String }]
  },
  timeline: [{
    milestone: String,
    date: String,
    completed: Boolean,
    order: Number
  }],
  teamInvolved: [String],
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  lastEditedBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: Date
});

ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ 'basicInfo.status': 1 });
ProjectSchema.index({ status: 1 });

const Project = mongoose.models?.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
