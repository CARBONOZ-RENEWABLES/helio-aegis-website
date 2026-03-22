import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutPage extends Document {
  hero: {
    eyebrowText: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
  };
  stats: Array<{
    label: string;
    value: string;
    order: number;
  }>;
  story: {
    headline: string;
    paragraphs: string[];
  };
  mission: {
    headline: string;
    text: string;
  };
  values: {
    headline: string;
    items: string[];
  };
  offices: Array<{
    region: string;
    office: string;
    team: string;
    focus: string;
    order: number;
  }>;
  esg: {
    headline: string;
    subheadline: string;
    sections: Array<{
      title: string;
      metrics: Array<{
        label: string;
        value: string;
      }>;
    }>;
  };
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

const AboutPageSchema = new Schema<IAboutPage>({
  hero: {
    eyebrowText: String,
    headlineLine1: String,
    headlineLine2: String,
    subheadline: String
  },
  stats: [{
    label: String,
    value: String,
    order: Number
  }],
  story: {
    headline: String,
    paragraphs: [String]
  },
  mission: {
    headline: String,
    text: String
  },
  values: {
    headline: String,
    items: [String]
  },
  offices: [{
    region: String,
    office: String,
    team: String,
    focus: String,
    order: Number
  }],
  esg: {
    headline: String,
    subheadline: String,
    sections: [{
      title: String,
      metrics: [{
        label: String,
        value: String
      }]
    }]
  },
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

// Delete the model if it exists to avoid caching issues
if (mongoose.models?.AboutPage) {
  delete mongoose.models.AboutPage;
}

const AboutPage = mongoose.model<IAboutPage>('AboutPage', AboutPageSchema);

export default AboutPage;
