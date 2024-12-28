import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
  link: { 
    type: String, 
    required: true, 
    unique: true 
  },
  type: { 
    type: String, 
    enum: ['twitter', 'telegram', 'website'], 
    required: true 
  },
  firstSeenAt: { 
    type: Date, 
    default: Date.now 
  },
  firstSeenInToken: { 
    type: String, 
    required: true 
  }
});

export const Social = mongoose.model('Social', socialSchema);