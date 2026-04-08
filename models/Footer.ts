import mongoose, { Schema, Document } from 'mongoose';

export interface IFooter extends Document {
  logo: {
    imageUrl: string;
    altText: string;
  };
  newsletter: {
    headline: string;
    subheadline: string;
    buttonText: string;
    successMessage: string;
  };
  brand: {
    name: string;
    tagline: string;
    socialLinks: Array<{
      platform: string;
      icon: string;
      url: string;
      order: number;
    }>;
  };
  linkColumns: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
    order: number;
  }>;
  contact: {
    title: string;
    items: Array<{
      label: string;
      value: string;
      type: 'email' | 'phone' | 'text';
    }>;
  };
  certifications: Array<{
    icon: string;
    label: string;
    order: number;
  }>;
  legal: {
    links: Array<{
      label: string;
      href: string;
    }>;
    copyrightText: string;
  };
  status: 'draft' | 'published';
  lastEditedBy: string;
  updatedAt: Date;
}

const FooterSchema = new Schema<IFooter>({
  logo: {
    imageUrl: { type: String, default: '/images/heliosngrlogo.png' },
    altText: { type: String, default: 'Helios NRG' }
  },
  newsletter: {
    headline: String,
    subheadline: String,
    buttonText: String,
    successMessage: String
  },
  brand: {
    name: String,
    tagline: String,
    socialLinks: [{
      platform: String,
      icon: String,
      url: String,
      order: Number
    }]
  },
  linkColumns: [{
    title: String,
    links: [{
      label: String,
      href: String
    }],
    order: Number
  }],
  contact: {
    title: String,
    items: [{
      label: String,
      value: String,
      type: { type: String, enum: ['email', 'phone', 'text'] }
    }]
  },
  certifications: [{
    icon: String,
    label: String,
    order: Number
  }],
  legal: {
    links: [{
      label: String,
      href: String
    }],
    copyrightText: String
  },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  lastEditedBy: String,
  updatedAt: { type: Date, default: Date.now }
});

// Delete the model if it exists to avoid caching issues
if (mongoose.models?.Footer) {
  delete mongoose.models.Footer;
}

const Footer = mongoose.model<IFooter>('Footer', FooterSchema);

export default Footer;
