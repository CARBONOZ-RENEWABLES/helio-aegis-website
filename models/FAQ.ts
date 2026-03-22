import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['finance', 'development', 'investors', 'esg', 'process', 'about']
  },
  keyData: {
    label: String,
    value: String
  },
  cta: {
    text: String,
    href: String
  },
  order: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['published', 'draft'], 
    default: 'published' 
  }
}, { timestamps: true });

export default mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
