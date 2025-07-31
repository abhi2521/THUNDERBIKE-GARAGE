const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ✅ Ensure email is unique
    match: [/.+\@.+\..+/, 'Enter a valid email address']
  },
  phone: {
    type: String,
    required: true,
    unique: true, // ✅ Ensure phone number is unique
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  message: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactForm', ContactFormSchema);
