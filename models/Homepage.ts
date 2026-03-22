import mongoose, { Schema, Document } from 'mongoose';

export interface IHomepage extends Document {
  hero: {
    eyebrowText: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    primaryCTALabel: string;
    primaryCTAHref: string;
    secondaryCTALabel: string;
    secondaryCTAHref: string;
    backgroundType: 'gradient' | 'image' | 'video';
    backgroundImage?: string;
    backgroundVideo?: string;
    overlayOpacity: number;
  };
  metrics: Array<{
    value: string;
    label: string;
    suffix?: string;
    order: number;
  }>;
  marketTickerApiKey?: string;
  capabilities: Array<{
    title: string;
    description: string;
    href: string;
    iconName: string;
    order: number;
  }>;
  portfolioSection: {
    headline: string;
    subheadline: string;
  };
  investmentSection: {
    eyebrowText: string;
    headline: string;
    bodyText: string;
    features: string[];
    tabs: Array<{
      id: string;
      label: string;
      title: string;
      content: string;
      metrics?: Array<{
        label: string;
        value: string;
      }>;
    }>;
  };
  insightsSection: {
    headline: string;
    subheadline: string;
  };
  partnersSection: {
    headline: string;
    institutions: Array<{
      shortName: string;
      fullName: string;
      logo?: string;
      order: number;
    }>;
    certifications: Array<{
      icon: string;
      label: string;
      order: number;
    }>;
  };
  finalCTA: {
    headline: string;
    subheadline: string;
    primaryCTALabel: string;
    primaryCTAHref: string;
    secondaryCTALabel: string;
    secondaryCTAHref: string;
    trustSignal1: string;
    trustSignal2: string;
    trustSignal3: string;
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

const HomepageSchema = new Schema<IHomepage>({
  hero: {
    eyebrowText: String,
    headlineLine1: String,
    headlineLine2: String,
    subheadline: String,
    primaryCTALabel: String,
    primaryCTAHref: String,
    secondaryCTALabel: String,
    secondaryCTAHref: String,
    backgroundType: { type: String, enum: ['gradient', 'image', 'video'], default: 'gradient' },
    backgroundImage: String,
    backgroundVideo: String,
    overlayOpacity: { type: Number, default: 0.7 }
  },
  metrics: [{
    value: String,
    label: String,
    suffix: String,
    order: Number
  }],
  marketTickerApiKey: String,
  capabilities: [{
    title: String,
    description: String,
    href: String,
    iconName: String,
    order: Number
  }],
  portfolioSection: {
    headline: String,
    subheadline: String
  },
  investmentSection: {
    eyebrowText: String,
    headline: String,
    bodyText: String,
    features: [String],
    tabs: [{
      id: String,
      label: String,
      title: String,
      content: String,
      metrics: [{
        label: String,
        value: String
      }]
    }]
  },
  insightsSection: {
    headline: String,
    subheadline: String
  },
  partnersSection: {
    headline: String,
    institutions: [{
      shortName: String,
      fullName: String,
      logo: String,
      order: Number
    }],
    certifications: [{
      icon: String,
      label: String,
      order: Number
    }]
  },
  finalCTA: {
    headline: String,
    subheadline: String,
    primaryCTALabel: String,
    primaryCTAHref: String,
    secondaryCTALabel: String,
    secondaryCTAHref: String,
    trustSignal1: String,
    trustSignal2: String,
    trustSignal3: String
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

const Homepage = mongoose.models?.Homepage || mongoose.model<IHomepage>('Homepage', HomepageSchema);

export default Homepage;
