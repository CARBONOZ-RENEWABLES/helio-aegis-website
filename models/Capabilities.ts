import mongoose from 'mongoose';

const CapabilitiesSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
    default: 'Two Disciplines.\nOne Platform.'
  },
  sectionDescription: {
    type: String,
    default: 'Our integrated project management and energy finance model creates superior risk-adjusted returns for institutional capital.'
  },
  capabilities: [{
    title: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    href: { type: String, required: true },
    order: { type: Number, default: 0 }
  }]
}, { timestamps: true });

export default mongoose.models.Capabilities || mongoose.model('Capabilities', CapabilitiesSchema);
