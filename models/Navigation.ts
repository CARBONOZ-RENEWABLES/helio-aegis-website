import mongoose, { Schema, Document } from 'mongoose';

// Navigation Model
export interface INavItem {
  label: string;
  href?: string;
  order: number;
  children?: Array<{
    label: string;
    href: string;
    description?: string;
    order: number;
  }>;
}

export interface INavigation extends Document {
  logo: {
    imageUrl: string;
    altText: string;
  };
  siteTitle: string;
  primary: INavItem[];
  utilityLeft: Array<{ label: string; href: string }>;
  utilityRight: Array<{
    label: string;
    href: string;
    variant: 'ghost' | 'primary';
  }>;
  footerColumns: Array<{
    heading: string;
    links: Array<{ label: string; href: string }>;
  }>;
  footerLegal: {
    companyName: string;
    disclaimer: string;
    privacyHref: string;
    termsHref: string;
  };
  updatedAt: Date;
  lastEditedBy: string;
}

const NavigationSchema = new Schema<INavigation>({
  logo: {
    imageUrl: { type: String, default: '/images/heliosngrlogo.png' },
    altText: { type: String, default: 'Helios NRG' }
  },
  siteTitle: { type: String, default: 'Helios NRG' },
  primary: [{
    label: String,
    href: String,
    order: Number,
    children: [{
      label: String,
      href: String,
      description: String,
      order: Number
    }]
  }],
  utilityLeft: [{
    label: String,
    href: String
  }],
  utilityRight: [{
    label: String,
    href: String,
    variant: { type: String, enum: ['ghost', 'primary'] }
  }],
  footerColumns: [{
    heading: String,
    links: [{
      label: String,
      href: String
    }]
  }],
  footerLegal: {
    companyName: String,
    disclaimer: String,
    privacyHref: String,
    termsHref: String
  },
  updatedAt: { type: Date, default: Date.now },
  lastEditedBy: String
});

// InvestorPage Model
export interface IInvestorPage extends Document {
  hero: {
    headline: string;
    subheadline: string;
  };
  fundStrategies: Array<{
    name: string;
    subtitle: string;
    description: string;
    characteristics: string[];
    href: string;
    order: number;
  }>;
  performanceSection: {
    headline: string;
    bodyText: string;
    disclaimer: string;
  };
  contactPersons: Array<{
    name: string;
    role: string;
    email: string;
    calendarLink?: string;
    photo: string;
    order: number;
  }>;
  dataRoomSection: {
    headline: string;
    bodyText: string;
    teaserDocumentUrl?: string;
    formHeadline: string;
    formSubheadline: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  status: 'draft' | 'published';
  lastEditedBy: string;
  updatedAt: Date;
}

const InvestorPageSchema = new Schema<IInvestorPage>({
  hero: {
    headline: String,
    subheadline: String
  },
  fundStrategies: [{
    name: String,
    subtitle: String,
    description: String,
    characteristics: [String],
    href: String,
    order: Number
  }],
  performanceSection: {
    headline: String,
    bodyText: String,
    disclaimer: String
  },
  contactPersons: [{
    name: String,
    role: String,
    email: String,
    calendarLink: String,
    photo: String,
    order: Number
  }],
  dataRoomSection: {
    headline: String,
    bodyText: String,
    teaserDocumentUrl: String,
    formHeadline: String,
    formSubheadline: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String
  },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  lastEditedBy: String,
  updatedAt: { type: Date, default: Date.now }
});

export const Navigation = mongoose.models?.Navigation || mongoose.model<INavigation>('Navigation', NavigationSchema);
export const InvestorPage = mongoose.models?.InvestorPage || mongoose.model<IInvestorPage>('InvestorPage', InvestorPageSchema);
