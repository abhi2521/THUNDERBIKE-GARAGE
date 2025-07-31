const mongoose = require('mongoose');

const SponsorFormSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, required: true, match: /^\d{10}$/ },
  company:   { type: String, required: true },
  interest:  { type: String, required: true },
  message:   { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Sponsor', SponsorFormSchema);
