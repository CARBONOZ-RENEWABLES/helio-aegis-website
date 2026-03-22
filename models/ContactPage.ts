import mongoose, { Schema, Document } from 'mongoose';

export interface IContactPage extends Document {
  hero: {
    eyebrowText: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
  };
  contactMethods: Array<{
    title: string;
    email: string;
    phone: string;
    description: string;
    order: number;
  }>;
  contactForm: {
    headline: string;
    subheadline: string;
    responseTime: string;
    privacyText: string;
    submitButtonText: string;
    successMessage: string;
    inquiryTypes: Array<{
      value: string;
      label: string;
    }>;
  };
  offices: Array<{
    region: string;
    office: string;
    address: string;
    phone: string;
    timezone: string;
    order: number;
  }>;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
  status: 'draft' | 'published';
  lastEditedBy: string;
  updatedAt: Date;
  publishedAt?: Date;
}

const ContactPageSchema = new Schema<IContactPage>({
  hero: {
    eyebrowText: String,
    headlineLine1: String,
    headlineLine2: String,
    subheadline: String
  },
  contactMethods: [{
    title: String,
    email: String,
    phone: String,
    description: String,
    order: Number
  }],
  contactForm: {
    headline: String,
    subheadline: String,
    responseTime: String,
    privacyText: String,
    submitButtonText: String,
    successMessage: String,
    inquiryTypes: [{
      value: String,
      label: String
    }]
  },
  offices: [{
    region: String,
    office: String,
    address: String,
    phone: String,
    timezone: String,
    order: Number
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String
  },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  lastEditedBy: String,
  updatedAt: { type: Date, default: Date.now },
  publishedAt: Date
});

const ContactPage = mongoose.models?.ContactPage || mongoose.model<IContactPage>('ContactPage', ContactPageSchema);

export default ContactPage;
