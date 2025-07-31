const mongoose = require('mongoose');

const socialFormSchema = new mongoose.Schema(
  {
    
    github: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    facebook: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    youtube: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SocialForm', socialFormSchema);
