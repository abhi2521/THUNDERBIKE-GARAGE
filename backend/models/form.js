const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Enter a valid email'],
    unique: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    unique: true
  },
  degree: String,
  city: String,
  pincode: String,
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  message: String
});

module.exports = mongoose.model('Form', formSchema);
