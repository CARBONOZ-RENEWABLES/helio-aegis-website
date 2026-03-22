import mongoose from 'mongoose';

const MetricsSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
    default: 'Scale built on executed deals.'
  },
  sectionSubtitle: {
    type: String,
    default: 'Since 2012, Helio Aegis has structured and delivered:'
  },
  metrics: [{
    value: { type: Number, required: true },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    label: { type: String, required: true },
    order: { type: Number, default: 0 }
  }]
}, { timestamps: true });

export default mongoose.models.Metrics || mongoose.model('Metrics', MetricsSchema);
