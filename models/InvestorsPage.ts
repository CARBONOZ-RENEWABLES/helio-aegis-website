import mongoose from 'mongoose';

const InvestorsPageSchema = new mongoose.Schema({
  hero: {
    eyebrow: { type: String, default: 'Investors' },
    headline: { type: String, default: 'Institutional-Grade\nRenewable Infrastructure' },
    description: { type: String, default: 'Proven track record of deploying capital at scale across utility-scale renewable infrastructure with institutional-grade governance and risk management.' }
  },
  stats: [{
    label: { type: String, required: true },
    value: { type: String, required: true },
    order: { type: Number, default: 0 }
  }],
  fundStructures: [{
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    targetIRR: String,
    holdPeriod: String,
    aum: String,
    vintageYears: String,
    features: [String],
    order: { type: Number, default: 0 }
  }],
  irContacts: [{
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    profileImage: String,
    order: { type: Number, default: 0 }
  }],
  vintagePerformance: [{
    vintage: { type: String, required: true },
    irr: { type: String, required: true },
    tvpi: { type: String, required: true },
    status: { type: String, required: true },
    order: { type: Number, default: 0 }
  }]
}, { timestamps: true });

export default mongoose.models.InvestorsPage || mongoose.model('InvestorsPage', InvestorsPageSchema);
